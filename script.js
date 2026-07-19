/* 앱 진입점 — 이벤트 바인딩, 탭 전환, 모달 열고 닫기 */

(function () {
  let currentTicker = null;

  async function loadAndRenderTables() {
    const premarket = await dataService.getPremarketMovers();
    const regular = await dataService.getRegularMovers();
    const gainers = await dataService.getTopGainers();
    const losers = await dataService.getTopLosers();

    ui.renderStockTable(document.querySelector('[data-panel="premarket"] tbody'), premarket);
    ui.renderStockTable(document.querySelector('[data-panel="regular"] tbody'), regular);
    ui.renderStockTable(document.querySelector('[data-panel="gainers"] tbody'), gainers);
    ui.renderStockTable(document.querySelector('[data-panel="losers"] tbody'), losers);
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

    ui.renderModalHeader(document.getElementById("modal-header"), stock);
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
  }

  document.addEventListener("DOMContentLoaded", init);
})();
