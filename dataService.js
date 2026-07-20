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
  function hasApiKey() {
    return typeof FINNHUB_API_KEY !== "undefined" && !!FINNHUB_API_KEY;
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

  // Finnhub의 finnhubIndustry 원문(영문)을 우리가 쓰는 한국어 산업 카테고리로 매핑.
  // 정확한 전체 목록을 알 수 없어 키워드 포함 여부로 느슨하게 매칭하고, 매칭 실패 시 "기타".
  function mapIndustryToSector(industry) {
    if (!industry) return "기타";
    const s = industry.toLowerCase();
    if (s.includes("semiconductor")) return "반도체";
    if (s.includes("auto")) return "자동차";
    if (s.includes("bank") || s.includes("insurance") || s.includes("financ")) return "금융";
    if (s.includes("health") || s.includes("biotech") || s.includes("pharma") || s.includes("medical")) return "헬스케어";
    if (s.includes("apparel") || s.includes("footwear") || s.includes("sport")) return "스포츠/의류";
    if (s.includes("oil") || s.includes("gas") || s.includes("energy")) return "에너지";
    if (s.includes("media") || s.includes("entertainment")) return "미디어/엔터";
    if (s.includes("retail") || s.includes("e-commerce") || s.includes("consumer")) return "소비재";
    if (s.includes("software") || s.includes("technology") || s.includes("internet") || s.includes("hardware")) return "기술";
    return "기타";
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
        marketCap: profile.marketCapitalization ? profile.marketCapitalization * 1e6 : null,
        sector: mapIndustryToSector(profile.finnhubIndustry)
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

  function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 종목이 많아지면(현재 100개 이상) 한 번에 전부 fetch하면 Finnhub 분당 호출
  // 한도(60회)를 순간적으로 초과해 429가 나고, 같은 API 키를 쓰는 검색 등 다른 기능까지
  // 덩달아 막힌다. 일정 개수씩 나눠 호출 사이에 지연을 두어 부담을 분산시킨다.
  // getWatchlist()가 정기 자동 갱신(script.js)에서도 그대로 재사용된다.
  async function fetchInBatches(items, workFn, batchSize = 20, delayMs = 1100) {
    const batches = chunk(items, batchSize);
    const results = [];
    for (let i = 0; i < batches.length; i++) {
      if (i > 0) await delay(delayMs);
      results.push(...(await Promise.all(batches[i].map(workFn))));
    }
    return results;
  }

  async function getWatchlist() {
    return fetchInBatches(MOCK_WATCHLIST, withLiveQuote);
  }

  // 급상승/급하락은 더 이상 별도 API(Alpha Vantage TOP_GAINERS_LOSERS)에 의존하지
  // 않는다 — 그 무료 티어는 하루 25회 한도인 데다, 실제로 확인해보니 데이터 자체가
  // 며칠씩 묵어 있어(예: 실제 방문 당일보다 3일 전 데이터) "실시간"이라고 보기 어려웠다.
  // 대신 이미 실시간으로 갱신되는 정규장 워치리스트(101개 종목) 안에서 등락률 기준
  // 상/하위 N개를 뽑아 보여준다 — 시장 전체 스크리너는 아니지만 항상 오늘 데이터이고,
  // 워치리스트 자동 갱신 주기를 그대로 물려받아 진짜로 실시간에 가깝게 갱신된다.
  function computeMoversFromWatchlist(watchlistRows, limit) {
    const withChange = watchlistRows.filter((s) => s.changePercent !== null && s.changePercent !== undefined);
    const gainers = withChange
      .filter((s) => s.changePercent > 0)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, limit);
    const losers = withChange
      .filter((s) => s.changePercent < 0)
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, limit);
    return { gainers, losers };
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
      marketCap: (profile && profile.marketCap) || null,
      sector: (profile && profile.sector) || null
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

  let searchRateLimited = false;

  function wasSearchRateLimited() {
    return searchRateLimited;
  }

  async function searchSymbols(query) {
    if (!hasApiKey() || !query || query.trim().length < 1) return [];
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query.trim())}&token=${FINNHUB_API_KEY}`
      );
      searchRateLimited = res.status === 429;
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
    computeMoversFromWatchlist,
    getStockDetail,
    getNews,
    getEarnings,
    getSentiment,
    getRiskFlags,
    searchSymbols,
    getUsdKrwRate,
    getPriceHistory,
    wasSearchRateLimited
  };
})();
