/* 데이터 접근 계층 — mockData.js를 기본값으로 쓰되, 가격/등락률/등락폭은
   Finnhub 실시간 시세 API로 덮어쓴다. 뉴스/어닝/SNS 여론/리스크는 계속 mock.
   API 키가 없거나 요청이 실패하면 조용히 mock 가격으로 폴백한다. */

const dataService = (function () {
  async function fetchLiveQuote(ticker) {
    if (typeof FINNHUB_API_KEY === "undefined" || !FINNHUB_API_KEY) {
      return null;
    }
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

  function getNews(ticker) {
    return MOCK_STOCKS_BY_TICKER[ticker].news;
  }

  function getEarnings(ticker) {
    return MOCK_STOCKS_BY_TICKER[ticker].earnings;
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
