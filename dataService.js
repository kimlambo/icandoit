/* 데이터 접근 계층 — mockData.js를 기본값으로 쓰되, 가격/등락률/등락폭/뉴스/어닝은
   Finnhub API로 덮어쓴다. SNS 여론(X/레딧/StockTwits)과 리스크는 계속 mock.
   StockTwits 공개 API는 브라우저에서 CORS로 막혀 있어 백엔드 프록시 없이는
   직접 연동 불가 — 프록시 구축 시 재검토.
   API 요청이 실패/키 없음/데이터 없음이면 조용히 mock 값으로 폴백한다. */

const dataService = (function () {
  function hasApiKey() {
    return typeof FINNHUB_API_KEY !== "undefined" && !!FINNHUB_API_KEY;
  }

  function toDateStr(d) {
    return d.toISOString().slice(0, 10);
  }

  function formatMoney(n) {
    if (n === null || n === undefined) return null;
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + "M";
    return String(n);
  }

  async function fetchLiveQuote(ticker) {
    if (!hasApiKey()) return null;
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_API_KEY}`
      );
      if (!res.ok) {
        console.warn(`[dataService] ${ticker} 시세 조회 실패 (HTTP ${res.status}), mock 가격 사용`);
        return null;
      }
      const quote = await res.json();
      const hasData = quote && (quote.c || quote.pc);
      if (!hasData) {
        console.warn(`[dataService] ${ticker} 시세 데이터 없음, mock 가격 사용`);
        return null;
      }
      return { price: quote.c, changeAmount: quote.d, changePercent: quote.dp };
    } catch (err) {
      console.warn(`[dataService] ${ticker} 시세 조회 중 오류, mock 가격 사용`, err);
      return null;
    }
  }

  async function withLiveQuote(stock) {
    const live = await fetchLiveQuote(stock.ticker);
    return live ? { ...stock, ...live } : stock;
  }

  async function fetchCompanyNews(ticker) {
    if (!hasApiKey()) return null;
    try {
      const to = new Date();
      const from = new Date(to.getTime() - 14 * 24 * 60 * 60 * 1000);
      const res = await fetch(
        `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(ticker)}&from=${toDateStr(from)}&to=${toDateStr(to)}&token=${FINNHUB_API_KEY}`
      );
      if (!res.ok) {
        console.warn(`[dataService] ${ticker} 뉴스 조회 실패 (HTTP ${res.status}), mock 뉴스 사용`);
        return null;
      }
      const items = await res.json();
      if (!Array.isArray(items) || items.length === 0) {
        console.warn(`[dataService] ${ticker} 뉴스 데이터 없음, mock 뉴스 사용`);
        return null;
      }
      return items.slice(0, 6).map((item, i) => ({
        id: String(item.id ?? i),
        headline: item.headline,
        source: item.source,
        timestamp: new Date(item.datetime * 1000).toISOString(),
        url: item.url || "#"
      }));
    } catch (err) {
      console.warn(`[dataService] ${ticker} 뉴스 조회 중 오류, mock 뉴스 사용`, err);
      return null;
    }
  }

  async function fetchEarningsCalendar(ticker) {
    if (!hasApiKey()) return null;
    try {
      const today = new Date();
      const from = new Date(today.getTime() - 120 * 24 * 60 * 60 * 1000);
      const to = new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000);
      const res = await fetch(
        `https://finnhub.io/api/v1/calendar/earnings?from=${toDateStr(from)}&to=${toDateStr(to)}&symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_API_KEY}`
      );
      if (!res.ok) {
        console.warn(`[dataService] ${ticker} 어닝 조회 실패 (HTTP ${res.status}), mock 어닝 사용`);
        return null;
      }
      const data = await res.json();
      const list = data && data.earningsCalendar;
      if (!Array.isArray(list) || list.length === 0) {
        console.warn(`[dataService] ${ticker} 어닝 데이터 없음, mock 어닝 사용`);
        return null;
      }

      const todayStr = toDateStr(today);
      const upcoming = list.filter((e) => e.date >= todayStr).sort((a, b) => a.date.localeCompare(b.date));
      const past = list.filter((e) => e.date < todayStr).sort((a, b) => b.date.localeCompare(a.date));
      const chosen = upcoming[0] || past[0];
      if (!chosen) return null;

      const epsEstimate = chosen.epsEstimate ?? null;
      const epsActual = chosen.epsActual ?? null;
      const surprisePercent =
        epsActual !== null && epsEstimate ? ((epsActual - epsEstimate) / Math.abs(epsEstimate)) * 100 : null;

      return {
        reportDate: chosen.date,
        reportTime: chosen.hour === "bmo" ? "BMO" : "AMC",
        epsEstimate,
        epsActual,
        revenueEstimate: formatMoney(chosen.revenueEstimate ?? null),
        revenueActual: formatMoney(chosen.revenueActual ?? null),
        surprisePercent
      };
    } catch (err) {
      console.warn(`[dataService] ${ticker} 어닝 조회 중 오류, mock 어닝 사용`, err);
      return null;
    }
  }

  async function getPremarketMovers() {
    return Promise.all(MOCK_PREMARKET.map(withLiveQuote));
  }

  async function getRegularMovers() {
    return Promise.all(MOCK_REGULAR.map(withLiveQuote));
  }

  async function getTopGainers() {
    return Promise.all(MOCK_GAINERS.map(withLiveQuote));
  }

  async function getStockDetail(ticker) {
    return withLiveQuote(MOCK_STOCKS_BY_TICKER[ticker]);
  }

  async function getNews(ticker) {
    const live = await fetchCompanyNews(ticker);
    return live || MOCK_STOCKS_BY_TICKER[ticker].news;
  }

  async function getEarnings(ticker) {
    const live = await fetchEarningsCalendar(ticker);
    return live || MOCK_STOCKS_BY_TICKER[ticker].earnings;
  }

  function getSentiment(ticker) {
    return MOCK_STOCKS_BY_TICKER[ticker].sentiment;
  }

  function getRiskFlags(ticker) {
    return MOCK_STOCKS_BY_TICKER[ticker].risk;
  }

  return {
    getPremarketMovers,
    getRegularMovers,
    getTopGainers,
    getStockDetail,
    getNews,
    getEarnings,
    getSentiment,
    getRiskFlags
  };
})();
