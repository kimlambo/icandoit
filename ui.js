/* 순수 렌더링 함수 모음 — 데이터를 받아 DOM만 만든다. 이벤트 바인딩은 script.js 담당. */

const ui = (function () {
  function formatPercent(n) {
    const sign = n > 0 ? "+" : "";
    return `${sign}${n.toFixed(2)}%`;
  }

  function formatPrice(n) {
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatVolume(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return String(n);
  }

  function priceChangeClass(n) {
    return n >= 0 ? "change-positive" : "change-negative";
  }

  function formatDateTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString("ko-KR", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  }

  function riskLevelLabel(level) {
    return { low: "낮음", medium: "보통", high: "높음" }[level] || level;
  }

  function renderStockTable(tbodyEl, stocks) {
    tbodyEl.innerHTML = stocks
      .map(
        (s) => `
      <tr data-ticker="${s.ticker}">
        <td class="ticker-cell">${s.ticker}</td>
        <td class="name-cell">${s.name}</td>
        <td class="num">$${formatPrice(s.price)}</td>
        <td class="num ${priceChangeClass(s.changePercent)}">${formatPercent(s.changePercent)}</td>
        <td class="num">${formatVolume(s.volume)}</td>
        <td class="num">${s.marketCap}</td>
      </tr>`
      )
      .join("");
  }

  function renderModalHeader(containerEl, stock) {
    const priceRow =
      stock.price === null || stock.price === undefined
        ? `<span class="empty-state">가격 정보를 불러올 수 없습니다.</span>`
        : `
        <span>$${formatPrice(stock.price)}</span>
        <span class="${priceChangeClass(stock.changePercent)}">
          ${formatPercent(stock.changePercent)} (${stock.changeAmount >= 0 ? "+" : ""}${formatPrice(stock.changeAmount)})
        </span>`;

    containerEl.innerHTML = `
      <div class="modal-header-top">
        <span class="modal-ticker">${stock.ticker}</span>
        <span class="modal-name">${stock.name}</span>
      </div>
      <div class="modal-price-row">${priceRow}</div>`;
  }

  function renderNewsTab(containerEl, newsItems) {
    if (!newsItems || newsItems.length === 0) {
      containerEl.innerHTML = `<p class="empty-state">뉴스가 없습니다.</p>`;
      return;
    }
    containerEl.innerHTML = newsItems
      .map(
        (n) => `
      <div class="news-item">
        <a class="news-headline" href="${n.url}">${n.headline}</a>
        <div class="news-meta">${n.source} · ${formatDateTime(n.timestamp)}</div>
      </div>`
      )
      .join("");
  }

  function renderEarningsTab(containerEl, earnings) {
    if (!earnings || !earnings.reportDate) {
      containerEl.innerHTML = `<p class="empty-state">어닝 정보가 없습니다.</p>`;
      return;
    }

    const reportTimeLabel = earnings.reportTime === "BMO" ? "장 시작 전" : "장 마감 후";
    const surprise =
      earnings.surprisePercent === null || earnings.surprisePercent === undefined
        ? "-"
        : `${earnings.surprisePercent > 0 ? "+" : ""}${earnings.surprisePercent.toFixed(1)}%`;

    containerEl.innerHTML = `
      <div class="earnings-grid">
        <div class="earnings-item">
          <div class="earnings-label">발표일</div>
          <div class="earnings-value">${earnings.reportDate} (${reportTimeLabel})</div>
        </div>
        <div class="earnings-item">
          <div class="earnings-label">EPS 예상 / 실제</div>
          <div class="earnings-value">${earnings.epsEstimate ?? "-"} / ${earnings.epsActual ?? "-"}</div>
        </div>
        <div class="earnings-item">
          <div class="earnings-label">매출 예상 / 실제</div>
          <div class="earnings-value">${earnings.revenueEstimate ?? "-"} / ${earnings.revenueActual ?? "-"}</div>
        </div>
        <div class="earnings-item">
          <div class="earnings-label">서프라이즈</div>
          <div class="earnings-value">${surprise}</div>
        </div>
      </div>`;
  }

  function renderSentimentTab(containerEl, sentiment) {
    if (!sentiment) {
      containerEl.innerHTML = `<p class="empty-state">SNS 여론 데이터가 아직 없습니다.</p>`;
      return;
    }
    const platforms = [
      { key: "x", label: "X (Twitter)" },
      { key: "reddit", label: "Reddit" },
      { key: "stocktwits", label: "StockTwits" }
    ];

    containerEl.innerHTML = platforms
      .map(({ key, label }) => {
        const p = sentiment[key];
        return `
        <div class="sentiment-platform">
          <div class="sentiment-platform-name">
            <span>${label}</span>
            <span class="mention-volume">언급량 ${p.mentionVolume.toLocaleString()}건</span>
          </div>
          <div class="sentiment-bar">
            <div class="sentiment-bar-positive" style="width:${p.positive}%"></div>
            <div class="sentiment-bar-negative" style="width:${p.negative}%"></div>
          </div>
          <div class="sentiment-percent-row">
            <span class="sentiment-percent-positive">긍정 ${p.positive}%</span>
            <span class="sentiment-percent-negative">부정 ${p.negative}%</span>
          </div>
        </div>`;
      })
      .join("");
  }

  function renderRiskTab(containerEl, risk) {
    if (!risk) {
      containerEl.innerHTML = `<p class="empty-state">리스크 데이터가 아직 없습니다.</p>`;
      return;
    }
    const items = [
      { key: "dilution", title: "유상증자 가능성" },
      { key: "delisting", title: "상장폐지 위험" },
      { key: "shareDilutionRisk", title: "희석 가능성" }
    ];

    containerEl.innerHTML = items
      .map(({ key, title }) => {
        const r = risk[key];
        return `
        <div class="risk-item">
          <span class="risk-badge risk-${r.level}">${riskLevelLabel(r.level)}</span>
          <div>
            <div class="risk-body-title">${title}</div>
            <div class="risk-body-desc">${r.description}</div>
          </div>
        </div>`;
      })
      .join("");
  }

  function renderSearchResults(containerEl, results) {
    if (!results || results.length === 0) {
      containerEl.innerHTML = `<div class="search-result-empty">검색 결과가 없습니다.</div>`;
      return;
    }
    containerEl.innerHTML = results
      .map(
        (r) => `
      <button type="button" class="search-result-item" data-ticker="${r.symbol}">
        <span class="search-result-ticker">${r.symbol}</span>
        <span class="search-result-name">${r.name}</span>
      </button>`
      )
      .join("");
  }

  return {
    formatPercent,
    formatPrice,
    formatVolume,
    priceChangeClass,
    formatDateTime,
    renderStockTable,
    renderModalHeader,
    renderNewsTab,
    renderEarningsTab,
    renderSentimentTab,
    renderRiskTab,
    renderSearchResults
  };
})();
