/* 앱 진입점 — 이벤트 바인딩, 탭 전환, 모달 열고 닫기 */

(function () {
  let currentTicker = null;
  let currentStockDetail = null;
  let currencyMode = "USD";
  let usdKrwRate = null;
  const tableData = { watchlist: [], gainers: [], losers: [] };
  const sortState = { watchlist: { key: null, direction: null }, gainers: { key: null, direction: null }, losers: { key: null, direction: null } };

  function renderTable(panel) {
    ui.renderStockTable(document.querySelector(`[data-panel="${panel}"] tbody`), tableData[panel], currencyMode, usdKrwRate);
  }

  async function loadAndRenderTables() {
    tableData.watchlist = await dataService.getWatchlist();
    tableData.gainers = await dataService.getTopGainers();
    tableData.losers = await dataService.getTopLosers();

    renderTable("watchlist");
    renderTable("gainers");
    renderTable("losers");
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

    currentStockDetail = stock;
    ui.renderModalHeader(document.getElementById("modal-header"), stock, currencyMode, usdKrwRate);
    ui.renderNewsTab(document.getElementById("modal-panel-news"), news);
    ui.renderEarningsTab(document.getElementById("modal-panel-earnings"), earnings);
    ui.renderSentimentTab(document.getElementById("modal-panel-sentiment"), sentiment);
    ui.renderRiskTab(document.getElementById("modal-panel-risk"), risk);

    switchModalTab("news");

    const modal = document.getElementById("stock-modal");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    const modal = document.getElementById("stock-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    currentTicker = null;
    currentStockDetail = null;
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
        ui.renderSearchResults(results, matches);
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

    usdKrwRate = await dataService.getUsdKrwRate();
    if (!usdKrwRate) {
      const btn = document.getElementById("currency-toggle");
      btn.disabled = true;
      btn.title = "환율 정보를 불러올 수 없습니다.";
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
