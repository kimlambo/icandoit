/* 데이터 접근 계층 — mockData.js를 기본값으로 쓰되, 가격/등락률/등락폭/뉴스/어닝은
   Finnhub API로 덮어쓴다. SNS 여론(X/레딧/StockTwits)과 리스크는 계속 mock.
   StockTwits 공개 API는 브라우저에서 CORS로 막혀 있어 백엔드 프록시 없이는
   직접 연동 불가 — 프록시 구축 시 재검토.

   검색으로 들어온, mockData에 없는 임의의 티커도 지원한다: 가격/뉴스/어닝은
   Finnhub에서 직접 조회하고, 회사명/시가총액은 Finnhub 회사 프로필(profile2)로
   보완한다. SNS 여론·리스크·거래량은 아직 라이브 소스가 없어 null로 반환하고
   화면에서 "데이터 없음"으로 표시한다.

   API 요청이 실패/키 없음/데이터 없음이면 조용히 mock 값(있으면)으로 폴백한다. */

const dataService = (function () {
  let moversScreenerPromise = null;

  function hasApiKey() {
    return typeof FINNHUB_API_KEY !== "undefined" && !!FINNHUB_API_KEY;
  }

  function hasAlphaVantageKey() {
    return typeof ALPHA_VANTAGE_API_KEY !== "undefined" && !!ALPHA_VANTAGE_API_KEY;
  }

  function hasTwelveDataKey() {
    return typeof TWELVE_DATA_API_KEY !== "undefined" && !!TWELVE_DATA_API_KEY;
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
        console.warn(`[dataService] ${ticker} 시세 조회 실패 (HTTP ${res.status})`);
        return null;
      }
      const quote = await res.json();
      const hasData = quote && (quote.c || quote.pc);
      if (!hasData) {
        console.warn(`[dataService] ${ticker} 시세 데이터 없음`);
        return null;
      }
      return { price: quote.c, changeAmount: quote.d, changePercent: quote.dp };
    } catch (err) {
      console.warn(`[dataService] ${ticker} 시세 조회 중 오류`, err);
      return null;
    }
  }

  async function withLiveQuote(stock) {
    const live = await fetchLiveQuote(stock.ticker);
    return live ? { ...stock, ...live } : stock;
  }

  async function fetchCompanyProfile(ticker) {
    if (!hasApiKey()) return null;
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(ticker)}&token=${FINNHUB_API_KEY}`
      );
      if (!res.ok) return null;
      const profile = await res.json();
      if (!profile || !profile.name) return null;
      return {
        name: profile.name,
        marketCap: profile.marketCapitalization ? profile.marketCapitalization * 1e6 : null
      };
    } catch (err) {
      console.warn(`[dataService] ${ticker} 회사 프로필 조회 중 오류`, err);
      return null;
    }
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
        console.warn(`[dataService] ${ticker} 뉴스 조회 실패 (HTTP ${res.status})`);
        return null;
      }
      const items = await res.json();
      if (!Array.isArray(items) || items.length === 0) {
        console.warn(`[dataService] ${ticker} 뉴스 데이터 없음`);
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
      console.warn(`[dataService] ${ticker} 뉴스 조회 중 오류`, err);
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
        console.warn(`[dataService] ${ticker} 어닝 조회 실패 (HTTP ${res.status})`);
        return null;
      }
      const data = await res.json();
      const list = data && data.earningsCalendar;
      if (!Array.isArray(list) || list.length === 0) {
        console.warn(`[dataService] ${ticker} 어닝 데이터 없음`);
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
      console.warn(`[dataService] ${ticker} 어닝 조회 중 오류`, err);
      return null;
    }
  }

  async function getWatchlist() {
    return Promise.all(MOCK_WATCHLIST.map(withLiveQuote));
  }

  function looksLikeDerivativeTicker(ticker) {
    // 나스닥 5자리 티커의 마지막 글자는 증권 종류를 뜻함: W=워런트, R=권리, U=유닛.
    // 예: PSNYW(워런트), BPACR(권리) 등 일반 보통주가 아닌 파생 증권을 제외.
    return ticker.length === 5 && /[WUR]$/.test(ticker);
  }

  async function enrichAndFilterMovers(rawItems, limit) {
    const candidates = (rawItems || []).filter((item) => !looksLikeDerivativeTicker(item.ticker));
    const results = [];
    for (let i = 0; i < candidates.length && results.length < limit; i += 5) {
      const batch = candidates.slice(i, i + 5);
      const enriched = await Promise.all(
        batch.map(async (item) => {
          const profile = await fetchCompanyProfile(item.ticker);
          if (!profile || !profile.name) return null;
          return {
            ticker: item.ticker,
            name: profile.name,
            price: parseFloat(item.price),
            changePercent: parseFloat(item.change_percentage),
            changeAmount: parseFloat(item.change_amount),
            volume: parseFloat(item.volume),
            marketCap: profile.marketCap || null
          };
        })
      );
      enriched.forEach((s) => {
        if (s && results.length < limit) results.push(s);
      });
    }
    if (results.length < limit) {
      console.warn(`[dataService] 등록된 회사 정보가 있는 종목이 ${results.length}개만 확보됨 (목표 ${limit}개)`);
    }
    return results;
  }

  function fetchTopMoversScreener() {
    if (!hasAlphaVantageKey()) return Promise.resolve(null);
    if (moversScreenerPromise) return moversScreenerPromise;

    moversScreenerPromise = (async () => {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_API_KEY}`
        );
        if (!res.ok) {
          console.warn(`[dataService] 급상승/급하락 스크리너 조회 실패 (HTTP ${res.status}), mock 목록 사용`);
          return null;
        }
        const data = await res.json();
        if (!Array.isArray(data.top_gainers) || !Array.isArray(data.top_losers)) {
          console.warn(`[dataService] 스크리너 응답에 데이터 없음(호출 한도 초과 가능), mock 목록 사용`, data);
          return null;
        }
        const [gainers, losers] = await Promise.all([
          enrichAndFilterMovers(data.top_gainers, 10),
          enrichAndFilterMovers(data.top_losers, 10)
        ]);
        return { gainers, losers };
      } catch (err) {
        console.warn(`[dataService] 스크리너 조회 중 오류, mock 목록 사용`, err);
        return null;
      }
    })();

    return moversScreenerPromise;
  }

  async function getTopGainers() {
    const live = await fetchTopMoversScreener();
    if (live) return live.gainers;
    return Promise.all(MOCK_GAINERS.map(withLiveQuote));
  }

  async function getTopLosers() {
    const live = await fetchTopMoversScreener();
    if (live) return live.losers;
    return Promise.all(MOCK_LOSERS.map(withLiveQuote));
  }

  async function getStockDetail(ticker) {
    const base = MOCK_STOCKS_BY_TICKER[ticker];
    if (base) {
      return withLiveQuote(base);
    }

    const [quote, profile] = await Promise.all([fetchLiveQuote(ticker), fetchCompanyProfile(ticker)]);
    return {
      ticker,
      name: (profile && profile.name) || ticker,
      price: quote ? quote.price : null,
      changePercent: quote ? quote.changePercent : null,
      changeAmount: quote ? quote.changeAmount : null,
      volume: null,
      marketCap: (profile && profile.marketCap) || null
    };
  }

  async function getNews(ticker) {
    const live = await fetchCompanyNews(ticker);
    if (live) return live;
    const mock = MOCK_STOCKS_BY_TICKER[ticker];
    return mock ? mock.news : [];
  }

  async function getEarnings(ticker) {
    const live = await fetchEarningsCalendar(ticker);
    if (live) return live;
    const mock = MOCK_STOCKS_BY_TICKER[ticker];
    return mock ? mock.earnings : null;
  }

  function getSentiment(ticker) {
    const mock = MOCK_STOCKS_BY_TICKER[ticker];
    return mock ? mock.sentiment : null;
  }

  function getRiskFlags(ticker) {
    const mock = MOCK_STOCKS_BY_TICKER[ticker];
    return mock ? mock.risk : null;
  }

  let usdKrwRatePromise = null;

  function getUsdKrwRate() {
    if (usdKrwRatePromise) return usdKrwRatePromise;
    usdKrwRatePromise = (async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) {
          console.warn(`[dataService] 환율 조회 실패 (HTTP ${res.status})`);
          return null;
        }
        const data = await res.json();
        return data && data.rates && data.rates.KRW ? data.rates.KRW : null;
      } catch (err) {
        console.warn(`[dataService] 환율 조회 중 오류`, err);
        return null;
      }
    })();
    return usdKrwRatePromise;
  }

  async function getPriceHistory(ticker) {
    if (!hasTwelveDataKey()) return null;
    try {
      const res = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(ticker)}&interval=1day&outputsize=90&apikey=${TWELVE_DATA_API_KEY}`
      );
      if (!res.ok) {
        console.warn(`[dataService] ${ticker} 차트 조회 실패 (HTTP ${res.status})`);
        return null;
      }
      const data = await res.json();
      if (!data.values || !Array.isArray(data.values)) {
        console.warn(`[dataService] ${ticker} 차트 데이터 없음`, data);
        return null;
      }
      return data.values
        .map((v) => ({ date: v.datetime, close: parseFloat(v.close) }))
        .reverse();
    } catch (err) {
      console.warn(`[dataService] ${ticker} 차트 조회 중 오류`, err);
      return null;
    }
  }

  async function searchSymbols(query) {
    if (!hasApiKey() || !query || query.trim().length < 1) return [];
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query.trim())}&token=${FINNHUB_API_KEY}`
      );
      if (!res.ok) return [];
      const data = await res.json();
      const results = Array.isArray(data.result) ? data.result : [];
      return results
        .filter((r) => r.symbol && !r.symbol.includes(".") && r.type === "Common Stock")
        .slice(0, 8)
        .map((r) => ({ symbol: r.symbol, name: r.description }));
    } catch (err) {
      console.warn(`[dataService] 종목 검색 중 오류 (${query})`, err);
      return [];
    }
  }

  return {
    getWatchlist,
    getTopGainers,
    getTopLosers,
    getStockDetail,
    getNews,
    getEarnings,
    getSentiment,
    getRiskFlags,
    searchSymbols,
    getUsdKrwRate,
    getPriceHistory
  };
})();
