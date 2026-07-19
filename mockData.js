/* 목업 데이터 — 1단계 UI 프로토타입용. 실제 API 연동 시 이 파일만 교체 대상. */

const MOCK_STOCKS_BY_TICKER = {
  TSLA: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: 243.12,
    changePercent: 5.42,
    changeAmount: 12.5,
    volume: 84213000,
    marketCap: "780.3B",
    news: [
      { id: "n1", headline: "Tesla beats delivery estimates for Q2", source: "Reuters", timestamp: "2026-07-19T08:12:00Z", url: "#" },
      { id: "n2", headline: "Tesla expands Supercharger network in Europe", source: "Bloomberg", timestamp: "2026-07-18T14:30:00Z", url: "#" },
      { id: "n3", headline: "Analysts raise price target on Tesla ahead of earnings", source: "CNBC", timestamp: "2026-07-17T09:05:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-23", reportTime: "AMC", epsEstimate: 0.85, epsActual: 0.91, revenueEstimate: "25.4B", revenueActual: "26.1B", surprisePercent: 7.1 },
    sentiment: {
      x: { positive: 62, negative: 38, mentionVolume: 15234 },
      reddit: { positive: 48, negative: 52, mentionVolume: 3021 },
      stocktwits: { positive: 70, negative: 30, mentionVolume: 8890 }
    },
    risk: {
      dilution: { level: "medium", description: "최근 12개월 내 유상증자 이력 있음. 추가 증자 가능성 존재." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "전환사채 물량이 많아 향후 희석 가능성 높음." }
    }
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    price: 128.77,
    changePercent: 3.15,
    changeAmount: 3.94,
    volume: 52341000,
    marketCap: "3.16T",
    news: [
      { id: "n1", headline: "NVIDIA unveils next-gen AI chip architecture", source: "Reuters", timestamp: "2026-07-19T07:40:00Z", url: "#" },
      { id: "n2", headline: "Data center demand continues to outpace supply", source: "WSJ", timestamp: "2026-07-18T11:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-20", reportTime: "AMC", epsEstimate: 0.98, epsActual: null, revenueEstimate: "28.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 81, negative: 19, mentionVolume: 42110 },
      reddit: { positive: 74, negative: 26, mentionVolume: 9876 },
      stocktwits: { positive: 88, negative: 12, mentionVolume: 21034 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "전환사채·워런트 물량 미미." }
    }
  },
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 214.5,
    changePercent: -1.12,
    changeAmount: -2.43,
    volume: 38210000,
    marketCap: "3.29T",
    news: [
      { id: "n1", headline: "Apple iPhone shipments miss estimates in China", source: "Bloomberg", timestamp: "2026-07-19T06:55:00Z", url: "#" },
      { id: "n2", headline: "Apple to unveil new Vision Pro model this fall", source: "The Verge", timestamp: "2026-07-16T10:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-31", reportTime: "AMC", epsEstimate: 1.45, epsActual: null, revenueEstimate: "89.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 22876 },
      reddit: { positive: 50, negative: 50, mentionVolume: 4210 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 11023 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속 중으로 희석 위험 낮음." }
    }
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices, Inc.",
    price: 158.34,
    changePercent: 4.02,
    changeAmount: 6.12,
    volume: 29873000,
    marketCap: "256.1B",
    news: [
      { id: "n1", headline: "AMD MI400 series sampling ahead of schedule", source: "Reuters", timestamp: "2026-07-19T08:05:00Z", url: "#" },
      { id: "n2", headline: "AMD gains server CPU market share vs Intel", source: "Tom's Hardware", timestamp: "2026-07-15T13:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-05", reportTime: "AMC", epsEstimate: 0.72, epsActual: null, revenueEstimate: "6.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 68, negative: 32, mentionVolume: 12044 },
      reddit: { positive: 63, negative: 37, mentionVolume: 5210 },
      stocktwits: { positive: 71, negative: 29, mentionVolume: 7654 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "인수 관련 주식 발행 가능성 일부 존재." }
    }
  },
  PLTR: {
    ticker: "PLTR",
    name: "Palantir Technologies Inc.",
    price: 34.82,
    changePercent: 8.91,
    changeAmount: 2.85,
    volume: 61234000,
    marketCap: "77.4B",
    news: [
      { id: "n1", headline: "Palantir wins new defense department contract", source: "CNBC", timestamp: "2026-07-19T09:15:00Z", url: "#" },
      { id: "n2", headline: "Palantir expands commercial AI platform partnerships", source: "Forbes", timestamp: "2026-07-14T12:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-04", reportTime: "BMO", epsEstimate: 0.09, epsActual: null, revenueEstimate: "748M", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 73, negative: 27, mentionVolume: 18902 },
      reddit: { positive: 66, negative: 34, mentionVolume: 8341 },
      stocktwits: { positive: 79, negative: 21, mentionVolume: 15012 }
    },
    risk: {
      dilution: { level: "medium", description: "스톡옵션 기반 보상 비중이 높아 지속적 희석 가능성 있음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "임직원 보상 관련 신주 발행이 꾸준히 발생." }
    }
  },
  GME: {
    ticker: "GME",
    name: "GameStop Corp.",
    price: 24.91,
    changePercent: -3.67,
    changeAmount: -0.95,
    volume: 18234000,
    marketCap: "11.2B",
    news: [
      { id: "n1", headline: "GameStop reports narrower quarterly loss", source: "Reuters", timestamp: "2026-07-18T20:10:00Z", url: "#" },
      { id: "n2", headline: "Retail investor interest in GME cools amid volatility", source: "MarketWatch", timestamp: "2026-07-16T15:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-09", reportTime: "AMC", epsEstimate: -0.03, epsActual: null, revenueEstimate: "0.86B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 44, negative: 56, mentionVolume: 27311 },
      reddit: { positive: 39, negative: 61, mentionVolume: 19876 },
      stocktwits: { positive: 51, negative: 49, mentionVolume: 13245 }
    },
    risk: {
      dilution: { level: "high", description: "과거 대규모 ATM 유상증자 이력 있으며 추가 증자 가능성 높음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "ATM 프로그램 활용으로 지속적 신주 발행 중." }
    }
  },
  COIN: {
    ticker: "COIN",
    name: "Coinbase Global, Inc.",
    price: 265.4,
    changePercent: 6.28,
    changeAmount: 15.68,
    volume: 9871000,
    marketCap: "67.8B",
    news: [
      { id: "n1", headline: "Coinbase trading volume surges with crypto rally", source: "CoinDesk", timestamp: "2026-07-19T07:20:00Z", url: "#" },
      { id: "n2", headline: "Coinbase launches new institutional custody product", source: "Bloomberg", timestamp: "2026-07-15T09:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-07", reportTime: "AMC", epsEstimate: 1.12, epsActual: null, revenueEstimate: "1.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 69, negative: 31, mentionVolume: 16543 },
      reddit: { positive: 60, negative: 40, mentionVolume: 6210 },
      stocktwits: { positive: 75, negative: 25, mentionVolume: 9432 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "전환사채 잔액 존재로 중장기 희석 여지 있음." }
    }
  },
  SOFI: {
    ticker: "SOFI",
    name: "SoFi Technologies, Inc.",
    price: 11.34,
    changePercent: 2.45,
    changeAmount: 0.27,
    volume: 41230000,
    marketCap: "12.5B",
    news: [
      { id: "n1", headline: "SoFi adds record number of new members in Q2", source: "CNBC", timestamp: "2026-07-19T06:30:00Z", url: "#" },
      { id: "n2", headline: "SoFi expands lending product suite", source: "Fintech Today", timestamp: "2026-07-12T11:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 0.06, epsActual: null, revenueEstimate: "0.74B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 58, negative: 42, mentionVolume: 8721 },
      reddit: { positive: 55, negative: 45, mentionVolume: 4102 },
      stocktwits: { positive: 64, negative: 36, mentionVolume: 6890 }
    },
    risk: {
      dilution: { level: "medium", description: "성장 자금 조달 목적의 유상증자 가능성 존재." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "전환사채 및 워런트 물량 존재." }
    }
  }
};

function pickFields(ticker) {
  const s = MOCK_STOCKS_BY_TICKER[ticker];
  return {
    ticker: s.ticker,
    name: s.name,
    price: s.price,
    changePercent: s.changePercent,
    changeAmount: s.changeAmount,
    volume: s.volume,
    marketCap: s.marketCap
  };
}

const MOCK_PREMARKET = ["TSLA", "NVDA", "PLTR", "COIN", "SOFI"].map(pickFields);
const MOCK_REGULAR = ["AAPL", "NVDA", "AMD", "TSLA", "GME", "COIN"].map(pickFields);
const MOCK_GAINERS = ["PLTR", "COIN", "TSLA", "AMD", "NVDA"].map(pickFields);
