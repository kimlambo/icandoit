/* 데이터 접근 계층 — 지금은 mockData.js를 감싸는 얇은 래퍼.
   추후 실제 API 연동 시 이 파일 내부 구현만 fetch() 기반으로 교체하면 되고,
   호출부(script.js)는 이미 async/await로 호출하므로 수정이 필요 없다. */

const dataService = (function () {
  function getPremarketMovers() {
    return MOCK_PREMARKET;
  }

  function getRegularMovers() {
    return MOCK_REGULAR;
  }

  function getTopGainers() {
    return MOCK_GAINERS;
  }

  function getStockDetail(ticker) {
    return MOCK_STOCKS_BY_TICKER[ticker];
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
