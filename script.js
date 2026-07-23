/* 앱 진입점 — 이벤트 바인딩, 탭 전환, 모달 열고 닫기 */

(function () {
  let currentTicker = null;
  let currentStockDetail = null;
  let currencyMode = "USD";
  let usdKrwRate = null;
  const tableData = { watchlist: [], gainers: [], losers: [] };
  const sortState = { watchlist: { key: null, direction: null }, gainers: { key: null, direction: null }, losers: { key: null, direction: null } };
  const filterState = { watchlist: "", gainers: "", losers: "" };

  let refreshInFlight = false;
  let tableTimerHandle = null;
  let modalTimerHandle = null;

  const MOVERS_LIMIT = 15;
  const WATCHLIST_POLL_INTERVAL_MS = 5 * 60 * 1000;
  const MOVERS_POLL_INTERVAL_MS = 15 * 60 * 1000;
  const MODAL_POLL_INTERVAL_MS = 15 * 1000;
  const MARKET_CLOSED_POLL_INTERVAL_MS = 30 * 60 * 1000;
  let lastMoversFetchAt = 0;

  function renderTable(panel, changedTickers) {
    const sector = filterState[panel];
    const rows = sector ? tableData[panel].filter((s) => s.sector === sector) : tableData[panel];
    ui.renderStockTable(document.querySelector(`[data-panel="${panel}"] tbody`), rows, currencyMode, usdKrwRate, changedTickers);
  }

  // 미국 정규장(9:30~16:00 ET, 월~금) 여부 — 장 외 시간엔 자동 갱신 주기를 늦춰
  // 불필요한 API 호출을 아낀다. 서버 없이 클라이언트 시계만으로 판단.
  function isUsMarketOpen() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      weekday: "short"
    }).formatToParts(new Date());
    const map = {};
    parts.forEach((p) => (map[p.type] = p.value));
    if (map.weekday === "Sat" || map.weekday === "Sun") return false;
    const minutesSinceMidnight = (parseInt(map.hour, 10) % 24) * 60 + parseInt(map.minute, 10);
    return minutesSinceMidnight >= 9 * 60 + 30 && minutesSinceMidnight < 16 * 60;
  }

  function getTablePollInterval() {
    return isUsMarketOpen() ? WATCHLIST_POLL_INTERVAL_MS : MARKET_CLOSED_POLL_INTERVAL_MS;
  }

  function scheduleTablePoll() {
    clearTimeout(tableTimerHandle);
    tableTimerHandle = setTimeout(async () => {
      try {
        await refreshMarketData();
      } catch (err) {
        console.warn("[script] 자동 갱신 중 오류", err);
      } finally {
        scheduleTablePoll();
      }
    }, getTablePollInterval());
  }

  function stopTablePolling() {
    clearTimeout(tableTimerHandle);
  }

  // 시장 전체 급상승/급하락 스크리너(FMP)를 시도하고, 실패하면 워치리스트 파생 방식으로
  // 조용히 폴백한다. 하루 250회 한도를 아끼기 위해 워치리스트보다 훨씬 느린 주기로 호출.
  async function refreshMovers() {
    const live = await dataService.fetchMarketMovers(MOVERS_LIMIT);
    if (live) {
      tableData.gainers = live.gainers;
      tableData.losers = live.losers;
    } else {
      const fallback = dataService.computeMoversFromWatchlist(tableData.watchlist, MOVERS_LIMIT);
      tableData.gainers = fallback.gainers;
      tableData.losers = fallback.losers;
    }
    renderTable("gainers");
    renderTable("losers");

    const isLive = dataService.isMoversLive();
    document.getElementById("gainers-live-note").classList.toggle("hidden", isLive !== false);
    document.getElementById("losers-live-note").classList.toggle("hidden", isLive !== false);

    lastMoversFetchAt = Date.now();
  }

  // 정규장 워치리스트(101개 종목) 시세를 통째로 다시 받는다. 급상승/급하락은 별도
  // 주기(MOVERS_POLL_INTERVAL_MS)가 지났을 때만 같이 갱신한다.
  async function refreshMarketData() {
    if (refreshInFlight) return;
    refreshInFlight = true;
    try {
      const freshRows = await dataService.getWatchlist();
      const changedTickers = mergeQuotesIntoTableData("watchlist", freshRows);
      renderTable("watchlist", changedTickers);

      if (Date.now() - lastMoversFetchAt >= MOVERS_POLL_INTERVAL_MS) {
        await refreshMovers();
      }

      setLastUpdated();

      // 마침 모달로 열려있는 종목이 이번에 갱신된 워치리스트에 포함되어 있으면
      // 재사용해서 모달도 같이 갱신하고, 모달 자체 타이머는 리셋해 직후 중복 호출을 막는다.
      const modalRow = currentTicker && tableData.watchlist.find((s) => s.ticker === currentTicker);
      if (modalRow) {
        currentStockDetail = {
          ...currentStockDetail,
          price: modalRow.price,
          changeAmount: modalRow.changeAmount,
          changePercent: modalRow.changePercent
        };
        ui.renderModalHeader(
          document.getElementById("modal-header"),
          currentStockDetail,
          currencyMode,
          usdKrwRate,
          changedTickers.get(currentTicker) || null
        );
        startModalPolling();
      }
    } finally {
      refreshInFlight = false;
    }
  }

  // freshRows의 가격/등락 필드를 tableData[panel]의 기존 항목에 티커 기준으로
  // in-place 병합한다(배열 자체를 교체하지 않아 현재 정렬 순서가 유지됨).
  // 반환값: 실제로 가격이 바뀐 티커 -> "up"|"down" 맵(펄스 애니메이션용).
  function mergeQuotesIntoTableData(panel, freshRows) {
    const changed = new Map();
    const freshByTicker = new Map(freshRows.map((r) => [r.ticker, r]));
    tableData[panel].forEach((row) => {
      const fresh = freshByTicker.get(row.ticker);
      if (!fresh || fresh.price === null || fresh.price === undefined) return;
      if (row.price !== null && row.price !== undefined && fresh.price !== row.price) {
        changed.set(row.ticker, fresh.price > row.price ? "up" : "down");
      }
      row.price = fresh.price;
      row.changeAmount = fresh.changeAmount;
      row.changePercent = fresh.changePercent;
    });
    return changed;
  }

  function startModalPolling() {
    clearTimeout(modalTimerHandle);
    modalTimerHandle = setTimeout(async () => {
      try {
        await refreshModalPrice();
      } catch (err) {
        console.warn("[script] 모달 가격 갱신 중 오류", err);
      } finally {
        if (currentTicker) startModalPolling();
      }
    }, MODAL_POLL_INTERVAL_MS);
  }

  function stopModalPolling() {
    clearTimeout(modalTimerHandle);
  }

  async function refreshModalPrice() {
    if (!currentTicker || refreshInFlight) return;
    const ticker = currentTicker;
    const fresh = await dataService.getStockDetail(ticker);
    if (!fresh || fresh.price === null || fresh.price === undefined) return;
    if (ticker !== currentTicker) return; // 그 사이 모달이 닫혔거나 다른 종목으로 바뀜
    const prevPrice = currentStockDetail ? currentStockDetail.price : null;
    const direction =
      prevPrice !== null && prevPrice !== undefined && fresh.price !== prevPrice
        ? fresh.price > prevPrice
          ? "up"
          : "down"
        : null;
    currentStockDetail = fresh;
    ui.renderModalHeader(document.getElementById("modal-header"), currentStockDetail, currencyMode, usdKrwRate, direction);
    setLastUpdated();
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopTablePolling();
      stopModalPolling();
    } else {
      scheduleTablePoll();
      if (currentTicker) startModalPolling();
    }
  }

  async function loadAndRenderTables() {
    tableData.watchlist = await dataService.getWatchlist();
    renderTable("watchlist");
    await refreshMovers();
  }

  function sortByColumn(panel, key) {
    const state = sortState[panel];
    state.direction = state.key === key && state.direction === "desc" ? "asc" : "desc";
    state.key = key;

    tableData[panel] = [...tableData[panel]].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      return state.direction === "asc" ? av - bv : bv - av;
    });

    renderTable(panel);

    document.querySelectorAll(`[data-panel="${panel}"] th.sortable`).forEach((th) => {
      th.classList.remove("sort-asc", "sort-desc");
      if (th.dataset.sortKey === key) th.classList.add(state.direction === "asc" ? "sort-asc" : "sort-desc");
    });
  }

  function setLastUpdated() {
    const el = document.getElementById("last-updated");
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    el.textContent = `마지막 업데이트: ${hh}:${mm}`;
  }

  function switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `panel-${tabName}`);
    });
  }

  function switchModalTab(tabName) {
    document.querySelectorAll(".modal-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.modalTab === tabName);
    });
    document.querySelectorAll(".modal-tab-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `modal-panel-${tabName}`);
    });
  }

  async function openModal(ticker) {
    currentTicker = ticker;
    const stock = await dataService.getStockDetail(ticker);
    const news = await dataService.getNews(ticker);
    const earnings = await dataService.getEarnings(ticker);
    const sentiment = await dataService.getSentiment(ticker);
    const risk = await dataService.getRiskFlags(ticker);
    const priceHistory = await dataService.getPriceHistory(ticker);

    currentStockDetail = stock;
    ui.renderModalHeader(document.getElementById("modal-header"), stock, currencyMode, usdKrwRate);
    ui.renderChartTab(document.getElementById("modal-panel-chart"), priceHistory);
    ui.renderNewsTab(document.getElementById("modal-panel-news"), news);
    ui.renderEarningsTab(document.getElementById("modal-panel-earnings"), earnings);
    ui.renderSentimentTab(document.getElementById("modal-panel-sentiment"), sentiment);
    ui.renderRiskTab(document.getElementById("modal-panel-risk"), risk);

    switchModalTab("chart");

    const modal = document.getElementById("stock-modal");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    startModalPolling();
  }

  function closeModal() {
    const modal = document.getElementById("stock-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    currentTicker = null;
    currentStockDetail = null;
    stopModalPolling();
  }

  function bindCurrencyToggle() {
    const btn = document.getElementById("currency-toggle");
    btn.addEventListener("click", () => {
      currencyMode = currencyMode === "USD" ? "KRW" : "USD";
      btn.textContent = currencyMode === "USD" ? "$ USD" : "₩ KRW";

      renderTable("watchlist");
      renderTable("gainers");
      renderTable("losers");

      if (currentStockDetail) {
        ui.renderModalHeader(document.getElementById("modal-header"), currentStockDetail, currencyMode, usdKrwRate);
      }
    });
  }

  function bindSectorFilters() {
    document.querySelectorAll(".sector-filter").forEach((select) => {
      select.addEventListener("change", () => {
        filterState[select.dataset.panel] = select.value;
        renderTable(select.dataset.panel);
      });
    });
  }

  function bindSearch() {
    const input = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    let debounceTimer = null;

    function hideResults() {
      results.classList.add("hidden");
      results.innerHTML = "";
    }

    input.addEventListener("input", () => {
      const query = input.value.trim();
      clearTimeout(debounceTimer);
      if (query.length < 1) {
        hideResults();
        return;
      }
      debounceTimer = setTimeout(async () => {
        const matches = await dataService.searchSymbols(query);
        if (input.value.trim() !== query) return;
        ui.renderSearchResults(results, matches, dataService.wasSearchRateLimited());
        results.classList.remove("hidden");
      }, 350);
    });

    results.addEventListener("click", (e) => {
      const item = e.target.closest(".search-result-item");
      if (!item) return;
      hideResults();
      input.value = "";
      openModal(item.dataset.ticker);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-box")) hideResults();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hideResults();
    });
  }

  function bindEvents() {
    document.querySelector(".tab-nav").addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;
      switchTab(btn.dataset.tab);
    });

    document.querySelectorAll(".stock-table").forEach((table) => {
      table.addEventListener("click", (e) => {
        const sortHeader = e.target.closest("th.sortable");
        if (sortHeader) {
          sortByColumn(table.dataset.panel, sortHeader.dataset.sortKey);
          return;
        }
        const row = e.target.closest("tr[data-ticker]");
        if (!row) return;
        openModal(row.dataset.ticker);
      });
    });

    document.querySelector(".modal-tab-nav").addEventListener("click", (e) => {
      const btn = e.target.closest(".modal-tab-btn");
      if (!btn) return;
      switchModalTab(btn.dataset.modalTab);
    });

    document.querySelector(".modal-close").addEventListener("click", closeModal);

    document.getElementById("stock-modal").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !document.getElementById("stock-modal").classList.contains("hidden")) {
        closeModal();
      }
    });
  }

  async function init() {
    setLastUpdated();
    await loadAndRenderTables();
    bindEvents();
    bindSearch();
    bindCurrencyToggle();
    bindSectorFilters();

    scheduleTablePoll();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    usdKrwRate = await dataService.getUsdKrwRate();
    if (!usdKrwRate) {
      const btn = document.getElementById("currency-toggle");
      btn.disabled = true;
      btn.title = "환율 정보를 불러올 수 없습니다.";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
