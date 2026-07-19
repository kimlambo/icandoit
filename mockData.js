/* 목업 데이터 — 1단계 UI 프로토타입용. 실제 API 연동 시 이 파일만 교체 대상. */

const MOCK_STOCKS_BY_TICKER = {
  TSLA: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    nameKo: "테슬라",
    price: 243.12,
    changePercent: 5.42,
    changeAmount: 12.5,
    volume: 84213000,
    marketCap: 780300000000,
    sector: "자동차",
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
    nameKo: "엔비디아",
    price: 128.77,
    changePercent: 3.15,
    changeAmount: 3.94,
    volume: 52341000,
    marketCap: 3160000000000,
    sector: "반도체",
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
    nameKo: "애플",
    price: 214.5,
    changePercent: -1.12,
    changeAmount: -2.43,
    volume: 38210000,
    marketCap: 3290000000000,
    sector: "기술",
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
    nameKo: "AMD",
    price: 158.34,
    changePercent: 4.02,
    changeAmount: 6.12,
    volume: 29873000,
    marketCap: 256100000000,
    sector: "반도체",
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
    nameKo: "팔란티어",
    price: 34.82,
    changePercent: 8.91,
    changeAmount: 2.85,
    volume: 61234000,
    marketCap: 77400000000,
    sector: "기술",
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
    nameKo: "게임스탑",
    price: 24.91,
    changePercent: -3.67,
    changeAmount: -0.95,
    volume: 18234000,
    marketCap: 11200000000,
    sector: "소비재",
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
    nameKo: "코인베이스",
    price: 265.4,
    changePercent: 6.28,
    changeAmount: 15.68,
    volume: 9871000,
    marketCap: 67800000000,
    sector: "금융",
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
    nameKo: "소파이",
    price: 11.34,
    changePercent: 2.45,
    changeAmount: 0.27,
    volume: 41230000,
    marketCap: 12500000000,
    sector: "금융",
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
  },
  MSTR: {
    ticker: "MSTR",
    name: "MicroStrategy Incorporated",
    nameKo: "마이크로스트래티지",
    price: 402.15,
    changePercent: 7.85,
    changeAmount: 29.28,
    volume: 3204000,
    marketCap: 71000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "MicroStrategy adds another 5,000 BTC to holdings", source: "CoinDesk", timestamp: "2026-07-19T07:10:00Z", url: "#" },
      { id: "n2", headline: "MicroStrategy stock tracks bitcoin rally closely", source: "Bloomberg", timestamp: "2026-07-17T13:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-31", reportTime: "AMC", epsEstimate: -0.42, epsActual: null, revenueEstimate: "0.12B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 84, negative: 16, mentionVolume: 31022 },
      reddit: { positive: 70, negative: 30, mentionVolume: 9204 },
      stocktwits: { positive: 86, negative: 14, mentionVolume: 17650 }
    },
    risk: {
      dilution: { level: "high", description: "비트코인 매입 재원 마련을 위한 전환사채·유상증자가 상시적으로 발생." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "전환사채 발행이 잦아 장기 주주 희석 우려 지속." }
    }
  },
  SMCI: {
    ticker: "SMCI",
    name: "Super Micro Computer, Inc.",
    nameKo: "슈퍼마이크로컴퓨터",
    price: 42.18,
    changePercent: -6.32,
    changeAmount: -2.84,
    volume: 15620000,
    marketCap: 24700000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Super Micro shares slide on delayed filing concerns", source: "Reuters", timestamp: "2026-07-19T08:45:00Z", url: "#" },
      { id: "n2", headline: "Super Micro reaffirms compliance timeline with Nasdaq", source: "CNBC", timestamp: "2026-07-16T10:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: 0.62, epsActual: null, revenueEstimate: "6.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 41, negative: 59, mentionVolume: 19870 },
      reddit: { positive: 35, negative: 65, mentionVolume: 7120 },
      stocktwits: { positive: 46, negative: 54, mentionVolume: 10450 }
    },
    risk: {
      dilution: { level: "medium", description: "회계 이슈 대응 과정에서 자금 조달용 증자 가능성 존재." },
      delisting: { level: "high", description: "과거 재무제표 제출 지연 이력으로 나스닥 상장 요건 위반 우려." },
      shareDilutionRisk: { level: "medium", description: "신뢰 회복을 위한 자본 확충 시 희석 가능성 있음." }
    }
  },
  RIVN: {
    ticker: "RIVN",
    name: "Rivian Automotive, Inc.",
    nameKo: "리비안",
    price: 13.45,
    changePercent: 4.2,
    changeAmount: 0.54,
    volume: 32140000,
    marketCap: 13900000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Rivian ramps R2 production ahead of schedule", source: "Reuters", timestamp: "2026-07-19T06:50:00Z", url: "#" },
      { id: "n2", headline: "Rivian narrows quarterly cash burn guidance", source: "Electrek", timestamp: "2026-07-14T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: -0.85, epsActual: null, revenueEstimate: "1.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 60, negative: 40, mentionVolume: 10230 },
      reddit: { positive: 57, negative: 43, mentionVolume: 5310 },
      stocktwits: { positive: 63, negative: 37, mentionVolume: 7890 }
    },
    risk: {
      dilution: { level: "high", description: "지속적인 현금 소진으로 추가 유상증자 가능성 높음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "생산 확대 자금 조달을 위한 신주 발행 여지가 큼." }
    }
  },
  MARA: {
    ticker: "MARA",
    name: "MARA Holdings, Inc.",
    nameKo: "마라홀딩스",
    price: 18.92,
    changePercent: 9.64,
    changeAmount: 1.66,
    volume: 45320000,
    marketCap: 5600000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "MARA increases bitcoin mining hash rate capacity", source: "CoinDesk", timestamp: "2026-07-19T05:55:00Z", url: "#" },
      { id: "n2", headline: "MARA stock rallies with broader crypto market", source: "Yahoo Finance", timestamp: "2026-07-18T16:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-11", reportTime: "AMC", epsEstimate: 0.14, epsActual: null, revenueEstimate: "0.21B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 77, negative: 23, mentionVolume: 24310 },
      reddit: { positive: 68, negative: 32, mentionVolume: 8990 },
      stocktwits: { positive: 80, negative: 20, mentionVolume: 14210 }
    },
    risk: {
      dilution: { level: "high", description: "채굴 장비 확충을 위한 ATM 유상증자를 빈번하게 활용." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "ATM 프로그램을 통한 지속적 신주 발행으로 희석 위험 높음." }
    }
  },
  NIO: {
    ticker: "NIO",
    name: "NIO Inc.",
    nameKo: "니오",
    price: 5.62,
    changePercent: -2.15,
    changeAmount: -0.12,
    volume: 28710000,
    marketCap: 11900000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "NIO deliveries fall short of monthly target", source: "Reuters", timestamp: "2026-07-19T04:30:00Z", url: "#" },
      { id: "n2", headline: "NIO opens new battery swap stations across Europe", source: "CnEVPost", timestamp: "2026-07-13T08:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-27", reportTime: "BMO", epsEstimate: -0.18, epsActual: null, revenueEstimate: "1.7B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 47, negative: 53, mentionVolume: 9120 },
      reddit: { positive: 42, negative: 58, mentionVolume: 3670 },
      stocktwits: { positive: 50, negative: 50, mentionVolume: 6210 }
    },
    risk: {
      dilution: { level: "medium", description: "적자 지속으로 인한 추가 자금 조달(유상증자) 가능성 존재." },
      delisting: { level: "medium", description: "중국 기업 ADR 특성상 미국 회계감독 규정 관련 리스크 상존." },
      shareDilutionRisk: { level: "medium", description: "전환사채 및 신주 발행을 통한 자금 조달 이력 있음." }
    }
  },
  INTC: {
    ticker: "INTC",
    name: "Intel Corporation",
    nameKo: "인텔",
    price: 31.2,
    changePercent: 1.35,
    changeAmount: 0.42,
    volume: 41200000,
    marketCap: 134500000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Intel foundry unit lands new external customer", source: "Reuters", timestamp: "2026-07-19T09:00:00Z", url: "#" },
      { id: "n2", headline: "Intel on track with 18A process node timeline", source: "Tom's Hardware", timestamp: "2026-07-15T14:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "AMC", epsEstimate: 0.11, epsActual: null, revenueEstimate: "12.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 52, negative: 48, mentionVolume: 11230 },
      reddit: { positive: 49, negative: 51, mentionVolume: 4890 },
      stocktwits: { positive: 54, negative: 46, mentionVolume: 6780 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  LCID: {
    ticker: "LCID",
    name: "Lucid Group, Inc.",
    nameKo: "루시드",
    price: 2.85,
    changePercent: -5.18,
    changeAmount: -0.16,
    volume: 38900000,
    marketCap: 6400000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Lucid cuts full-year delivery guidance again", source: "Reuters", timestamp: "2026-07-19T07:25:00Z", url: "#" },
      { id: "n2", headline: "Lucid secures additional funding commitment from PIF", source: "Bloomberg", timestamp: "2026-07-15T12:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-05", reportTime: "AMC", epsEstimate: -0.24, epsActual: null, revenueEstimate: "0.24B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 38, negative: 62, mentionVolume: 6210 },
      reddit: { positive: 33, negative: 67, mentionVolume: 2870 },
      stocktwits: { positive: 41, negative: 59, mentionVolume: 4320 }
    },
    risk: {
      dilution: { level: "high", description: "지속적인 현금 소진으로 대주주(PIF) 대상 유상증자가 반복적으로 발생." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "high", description: "대규모 신주 발행 이력이 잦아 기존 주주 희석이 지속됨." }
    }
  },
  BYND: {
    ticker: "BYND",
    name: "Beyond Meat, Inc.",
    nameKo: "비욘드미트",
    price: 4.12,
    changePercent: -8.43,
    changeAmount: -0.38,
    volume: 12300000,
    marketCap: 260000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Beyond Meat sales decline continues amid weak demand", source: "CNBC", timestamp: "2026-07-19T06:10:00Z", url: "#" },
      { id: "n2", headline: "Beyond Meat explores further cost-cutting measures", source: "Reuters", timestamp: "2026-07-14T10:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-07", reportTime: "BMO", epsEstimate: -0.32, epsActual: null, revenueEstimate: "0.07B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 29, negative: 71, mentionVolume: 4120 },
      reddit: { positive: 24, negative: 76, mentionVolume: 3390 },
      stocktwits: { positive: 33, negative: 67, mentionVolume: 3980 }
    },
    risk: {
      dilution: { level: "high", description: "실적 부진에 따른 운영자금 확보 목적의 유상증자 가능성 높음." },
      delisting: { level: "medium", description: "과거 액면병합(reverse split) 이력이 있어 상장 유지 요건 관련 우려 상존." },
      shareDilutionRisk: { level: "high", description: "지속적 적자로 신주·전환사채 발행을 통한 자금 조달이 반복됨." }
    }
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    nameKo: "마이크로소프트",
    price: 398.5,
    changePercent: 0.85,
    changeAmount: 3.35,
    volume: 22100000,
    marketCap: 2950000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Microsoft Azure growth accelerates on AI demand", source: "Reuters", timestamp: "2026-07-19T08:00:00Z", url: "#" },
      { id: "n2", headline: "Microsoft expands Copilot integration across Office suite", source: "The Verge", timestamp: "2026-07-17T10:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "AMC", epsEstimate: 3.12, epsActual: null, revenueEstimate: "68.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 70, negative: 30, mentionVolume: 19870 },
      reddit: { positive: 64, negative: 36, mentionVolume: 6210 },
      stocktwits: { positive: 74, negative: 26, mentionVolume: 9430 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    nameKo: "알파벳(구글)",
    price: 186.4,
    changePercent: 1.2,
    changeAmount: 2.21,
    volume: 28700000,
    marketCap: 2280000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Alphabet's Gemini model gains enterprise adoption", source: "Bloomberg", timestamp: "2026-07-19T07:15:00Z", url: "#" },
      { id: "n2", headline: "Google Cloud reports accelerating revenue growth", source: "CNBC", timestamp: "2026-07-16T13:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-28", reportTime: "AMC", epsEstimate: 2.05, epsActual: null, revenueEstimate: "88.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 66, negative: 34, mentionVolume: 15230 },
      reddit: { positive: 61, negative: 39, mentionVolume: 5320 },
      stocktwits: { positive: 69, negative: 31, mentionVolume: 8110 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    nameKo: "아마존",
    price: 228.9,
    changePercent: -0.45,
    changeAmount: -1.03,
    volume: 31200000,
    marketCap: 2420000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Amazon Prime Day sales set new record", source: "Reuters", timestamp: "2026-07-18T18:40:00Z", url: "#" },
      { id: "n2", headline: "AWS unveils new AI infrastructure offerings", source: "TechCrunch", timestamp: "2026-07-15T09:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-01", reportTime: "AMC", epsEstimate: 1.32, epsActual: null, revenueEstimate: "158.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 63, negative: 37, mentionVolume: 17420 },
      reddit: { positive: 58, negative: 42, mentionVolume: 6890 },
      stocktwits: { positive: 65, negative: 35, mentionVolume: 9870 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  META: {
    ticker: "META",
    name: "Meta Platforms, Inc.",
    nameKo: "메타",
    price: 612.3,
    changePercent: 2.05,
    changeAmount: 12.3,
    volume: 14300000,
    marketCap: 1550000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Meta's AI ad targeting drives revenue upside", source: "CNBC", timestamp: "2026-07-19T06:20:00Z", url: "#" },
      { id: "n2", headline: "Meta ramps data center investment for 2027", source: "Bloomberg", timestamp: "2026-07-14T11:05:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-30", reportTime: "AMC", epsEstimate: 5.85, epsActual: null, revenueEstimate: "42.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 59, negative: 41, mentionVolume: 20110 },
      reddit: { positive: 53, negative: 47, mentionVolume: 7650 },
      stocktwits: { positive: 62, negative: 38, mentionVolume: 10230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  NFLX: {
    ticker: "NFLX",
    name: "Netflix, Inc.",
    nameKo: "넷플릭스",
    price: 985.2,
    changePercent: -1.15,
    changeAmount: -11.5,
    volume: 3200000,
    marketCap: 420000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Netflix subscriber growth slows in mature markets", source: "Reuters", timestamp: "2026-07-18T20:30:00Z", url: "#" },
      { id: "n2", headline: "Netflix expands live sports programming slate", source: "Variety", timestamp: "2026-07-13T15:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "AMC", epsEstimate: 6.28, epsActual: null, revenueEstimate: "11.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 9870 },
      reddit: { positive: 49, negative: 51, mentionVolume: 4120 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 5980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  AVGO: {
    ticker: "AVGO",
    name: "Broadcom Inc.",
    nameKo: "브로드컴",
    price: 275.6,
    changePercent: 3.4,
    changeAmount: 9.06,
    volume: 18900000,
    marketCap: 1290000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Broadcom custom AI chip orders surge from hyperscalers", source: "Reuters", timestamp: "2026-07-19T07:50:00Z", url: "#" },
      { id: "n2", headline: "Broadcom raises full-year semiconductor revenue outlook", source: "Barron's", timestamp: "2026-07-16T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-11", reportTime: "AMC", epsEstimate: 1.68, epsActual: null, revenueEstimate: "15.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 75, negative: 25, mentionVolume: 13210 },
      reddit: { positive: 69, negative: 31, mentionVolume: 4980 },
      stocktwits: { positive: 78, negative: 22, mentionVolume: 7340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "대규모 인수 관련 주식 발행 이력이 있어 일부 희석 여지 존재." }
    }
  },
  JPM: {
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    nameKo: "JP모건",
    price: 268.4,
    changePercent: 0.62,
    changeAmount: 1.65,
    volume: 8120000,
    marketCap: 760000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "JPMorgan raises net interest income guidance", source: "Reuters", timestamp: "2026-07-19T07:00:00Z", url: "#" },
      { id: "n2", headline: "JPMorgan trading desk posts record quarter", source: "Bloomberg", timestamp: "2026-07-15T10:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-14", reportTime: "BMO", epsEstimate: 4.32, epsActual: null, revenueEstimate: "42.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 61, negative: 39, mentionVolume: 5210 },
      reddit: { positive: 54, negative: 46, mentionVolume: 1870 },
      stocktwits: { positive: 64, negative: 36, mentionVolume: 2980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형 은행주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  NKE: {
    ticker: "NKE",
    name: "Nike, Inc.",
    nameKo: "나이키",
    price: 78.25,
    changePercent: -1.83,
    changeAmount: -1.46,
    volume: 10230000,
    marketCap: 116000000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Nike direct-to-consumer sales show signs of recovery", source: "CNBC", timestamp: "2026-07-18T15:30:00Z", url: "#" },
      { id: "n2", headline: "Nike expands running shoe lineup ahead of marathon season", source: "Reuters", timestamp: "2026-07-13T11:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-25", reportTime: "AMC", epsEstimate: 0.58, epsActual: null, revenueEstimate: "11.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 53, negative: 47, mentionVolume: 4320 },
      reddit: { positive: 47, negative: 53, mentionVolume: 1540 },
      stocktwits: { positive: 56, negative: 44, mentionVolume: 2210 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  JNJ: {
    ticker: "JNJ",
    name: "Johnson & Johnson",
    nameKo: "존슨앤드존슨",
    price: 162.7,
    changePercent: 0.34,
    changeAmount: 0.55,
    volume: 6120000,
    marketCap: 392000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "J&J pipeline drug clears late-stage trial", source: "Reuters", timestamp: "2026-07-18T13:20:00Z", url: "#" },
      { id: "n2", headline: "Johnson & Johnson raises full-year guidance", source: "Bloomberg", timestamp: "2026-07-12T09:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-16", reportTime: "BMO", epsEstimate: 2.68, epsActual: null, revenueEstimate: "22.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 57, negative: 43, mentionVolume: 2870 },
      reddit: { positive: 51, negative: 49, mentionVolume: 980 },
      stocktwits: { positive: 60, negative: 40, mentionVolume: 1540 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  XOM: {
    ticker: "XOM",
    name: "Exxon Mobil Corporation",
    nameKo: "엑슨모빌",
    price: 118.6,
    changePercent: 1.47,
    changeAmount: 1.72,
    volume: 14320000,
    marketCap: 495000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "Exxon Mobil boosts output at Permian Basin assets", source: "Reuters", timestamp: "2026-07-19T05:40:00Z", url: "#" },
      { id: "n2", headline: "Exxon Mobil expands low-carbon investment plans", source: "WSJ", timestamp: "2026-07-11T08:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-31", reportTime: "BMO", epsEstimate: 2.14, epsActual: null, revenueEstimate: "89.7B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 49, negative: 51, mentionVolume: 3210 },
      reddit: { positive: 44, negative: 56, mentionVolume: 1230 },
      stocktwits: { positive: 52, negative: 48, mentionVolume: 1870 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  QCOM: {
    ticker: "QCOM",
    name: "QUALCOMM Incorporated",
    nameKo: "퀄컴",
    price: 168.4,
    changePercent: 1.23,
    changeAmount: 2.05,
    volume: 9120000,
    marketCap: 190000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Qualcomm expands automotive chip design wins", source: "Reuters", timestamp: "2026-07-19T06:15:00Z", url: "#" },
      { id: "n2", headline: "Qualcomm Snapdragon adoption grows in AI PCs", source: "The Verge", timestamp: "2026-07-14T10:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-30", reportTime: "AMC", epsEstimate: 2.85, epsActual: null, revenueEstimate: "10.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 60, negative: 40, mentionVolume: 4210 },
      reddit: { positive: 55, negative: 45, mentionVolume: 1560 },
      stocktwits: { positive: 63, negative: 37, mentionVolume: 2340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  TXN: {
    ticker: "TXN",
    name: "Texas Instruments Incorporated",
    nameKo: "텍사스 인스트루먼트",
    price: 195.3,
    changePercent: -0.82,
    changeAmount: -1.61,
    volume: 5230000,
    marketCap: 180000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Texas Instruments analog chip demand steadies", source: "Reuters", timestamp: "2026-07-18T14:00:00Z", url: "#" },
      { id: "n2", headline: "TI ramps new Sherman, Texas fab capacity", source: "Bloomberg", timestamp: "2026-07-11T09:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-22", reportTime: "AMC", epsEstimate: 1.42, epsActual: null, revenueEstimate: "4.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 2340 },
      reddit: { positive: 50, negative: 50, mentionVolume: 980 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 1450 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  F: {
    ticker: "F",
    name: "Ford Motor Company",
    nameKo: "포드",
    price: 12.85,
    changePercent: 0.45,
    changeAmount: 0.06,
    volume: 45230000,
    marketCap: 48000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Ford EV division narrows quarterly losses", source: "Reuters", timestamp: "2026-07-19T05:20:00Z", url: "#" },
      { id: "n2", headline: "Ford ramps hybrid truck production", source: "Automotive News", timestamp: "2026-07-12T08:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "AMC", epsEstimate: 0.14, epsActual: null, revenueEstimate: "44.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 48, negative: 52, mentionVolume: 3210 },
      reddit: { positive: 44, negative: 56, mentionVolume: 1340 },
      stocktwits: { positive: 51, negative: 49, mentionVolume: 1980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  GM: {
    ticker: "GM",
    name: "General Motors Company",
    nameKo: "제너럴모터스",
    price: 52.1,
    changePercent: 1.8,
    changeAmount: 0.92,
    volume: 12340000,
    marketCap: 55000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "GM raises full-year profit outlook", source: "CNBC", timestamp: "2026-07-19T07:35:00Z", url: "#" },
      { id: "n2", headline: "GM expands battery plant partnership", source: "Reuters", timestamp: "2026-07-13T10:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-22", reportTime: "BMO", epsEstimate: 2.35, epsActual: null, revenueEstimate: "45.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 57, negative: 43, mentionVolume: 2870 },
      reddit: { positive: 52, negative: 48, mentionVolume: 1120 },
      stocktwits: { positive: 60, negative: 40, mentionVolume: 1670 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  BAC: {
    ticker: "BAC",
    name: "Bank of America Corporation",
    nameKo: "뱅크오브아메리카",
    price: 44.6,
    changePercent: 0.63,
    changeAmount: 0.28,
    volume: 32100000,
    marketCap: 330000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Bank of America net interest margin beats estimates", source: "Reuters", timestamp: "2026-07-19T06:45:00Z", url: "#" },
      { id: "n2", headline: "BofA sees resilient consumer spending trends", source: "Bloomberg", timestamp: "2026-07-15T09:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-15", reportTime: "BMO", epsEstimate: 0.92, epsActual: null, revenueEstimate: "26.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 3120 },
      reddit: { positive: 50, negative: 50, mentionVolume: 1210 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 1780 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형 은행주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  V: {
    ticker: "V",
    name: "Visa Inc.",
    nameKo: "비자",
    price: 312.75,
    changePercent: 0.94,
    changeAmount: 2.91,
    volume: 5980000,
    marketCap: 620000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Visa cross-border volume growth accelerates", source: "Reuters", timestamp: "2026-07-18T16:20:00Z", url: "#" },
      { id: "n2", headline: "Visa expands stablecoin settlement pilot", source: "CoinDesk", timestamp: "2026-07-12T11:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "AMC", epsEstimate: 2.85, epsActual: null, revenueEstimate: "9.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 66, negative: 34, mentionVolume: 4560 },
      reddit: { positive: 60, negative: 40, mentionVolume: 1650 },
      stocktwits: { positive: 69, negative: 31, mentionVolume: 2340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  PFE: {
    ticker: "PFE",
    name: "Pfizer Inc.",
    nameKo: "화이자",
    price: 27.4,
    changePercent: -1.14,
    changeAmount: -0.32,
    volume: 34210000,
    marketCap: 155000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Pfizer oncology drug wins expanded FDA approval", source: "Reuters", timestamp: "2026-07-18T13:10:00Z", url: "#" },
      { id: "n2", headline: "Pfizer cost-cutting program ahead of schedule", source: "CNBC", timestamp: "2026-07-10T09:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-05", reportTime: "BMO", epsEstimate: 0.62, epsActual: null, revenueEstimate: "13.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 46, negative: 54, mentionVolume: 2980 },
      reddit: { positive: 42, negative: 58, mentionVolume: 1120 },
      stocktwits: { positive: 49, negative: 51, mentionVolume: 1560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  UNH: {
    ticker: "UNH",
    name: "UnitedHealth Group Incorporated",
    nameKo: "유나이티드헬스그룹",
    price: 512.9,
    changePercent: 0.31,
    changeAmount: 1.58,
    volume: 3450000,
    marketCap: 470000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "UnitedHealth medical cost ratio improves", source: "Reuters", timestamp: "2026-07-19T07:05:00Z", url: "#" },
      { id: "n2", headline: "UnitedHealth expands value-based care network", source: "Modern Healthcare", timestamp: "2026-07-14T10:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-13", reportTime: "BMO", epsEstimate: 7.12, epsActual: null, revenueEstimate: "112.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 52, negative: 48, mentionVolume: 2340 },
      reddit: { positive: 47, negative: 53, mentionVolume: 890 },
      stocktwits: { positive: 55, negative: 45, mentionVolume: 1230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  LULU: {
    ticker: "LULU",
    name: "Lululemon Athletica Inc.",
    nameKo: "룰루레몬",
    price: 285.6,
    changePercent: -2.41,
    changeAmount: -7.06,
    volume: 2340000,
    marketCap: 32000000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Lululemon same-store sales growth cools in North America", source: "CNBC", timestamp: "2026-07-18T15:40:00Z", url: "#" },
      { id: "n2", headline: "Lululemon expands international store openings", source: "Reuters", timestamp: "2026-07-11T09:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-04", reportTime: "AMC", epsEstimate: 2.75, epsActual: null, revenueEstimate: "2.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 45, negative: 55, mentionVolume: 3120 },
      reddit: { positive: 40, negative: 60, mentionVolume: 1450 },
      stocktwits: { positive: 48, negative: 52, mentionVolume: 1890 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  ORCL: {
    ticker: "ORCL",
    name: "Oracle Corporation",
    nameKo: "오라클",
    price: 178.2,
    changePercent: 2.14,
    changeAmount: 3.73,
    volume: 8760000,
    marketCap: 490000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Oracle cloud infrastructure bookings surge on AI demand", source: "Reuters", timestamp: "2026-07-19T08:20:00Z", url: "#" },
      { id: "n2", headline: "Oracle signs major hyperscaler capacity deal", source: "Bloomberg", timestamp: "2026-07-16T11:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-10", reportTime: "AMC", epsEstimate: 1.65, epsActual: null, revenueEstimate: "15.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 71, negative: 29, mentionVolume: 8210 },
      reddit: { positive: 65, negative: 35, mentionVolume: 3120 },
      stocktwits: { positive: 74, negative: 26, mentionVolume: 4560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "클라우드 데이터센터 확충 자금 조달을 위한 부채성 자금조달 병행 가능성 있음." }
    }
  },
  CRM: {
    ticker: "CRM",
    name: "Salesforce, Inc.",
    nameKo: "세일즈포스",
    price: 342.1,
    changePercent: 1.52,
    changeAmount: 5.12,
    volume: 4230000,
    marketCap: 330000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Salesforce Agentforce adoption accelerates among enterprise clients", source: "TechCrunch", timestamp: "2026-07-19T06:35:00Z", url: "#" },
      { id: "n2", headline: "Salesforce raises full-year revenue guidance", source: "CNBC", timestamp: "2026-07-15T13:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-27", reportTime: "AMC", epsEstimate: 2.68, epsActual: null, revenueEstimate: "9.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 64, negative: 36, mentionVolume: 5670 },
      reddit: { positive: 58, negative: 42, mentionVolume: 2010 },
      stocktwits: { positive: 67, negative: 33, mentionVolume: 3120 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "인수합병 관련 주식 발행 이력이 있어 일부 희석 여지 존재." }
    }
  },
  CVX: {
    ticker: "CVX",
    name: "Chevron Corporation",
    nameKo: "셰브론",
    price: 168.9,
    changePercent: 0.72,
    changeAmount: 1.21,
    volume: 7120000,
    marketCap: 290000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "Chevron closes major offshore acquisition", source: "Reuters", timestamp: "2026-07-19T05:10:00Z", url: "#" },
      { id: "n2", headline: "Chevron raises dividend on strong free cash flow", source: "WSJ", timestamp: "2026-07-10T08:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-01", reportTime: "BMO", epsEstimate: 2.98, epsActual: null, revenueEstimate: "48.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 51, negative: 49, mentionVolume: 2340 },
      reddit: { positive: 46, negative: 54, mentionVolume: 980 },
      stocktwits: { positive: 54, negative: 46, mentionVolume: 1450 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  DIS: {
    ticker: "DIS",
    name: "The Walt Disney Company",
    nameKo: "월트디즈니",
    price: 108.45,
    changePercent: -0.54,
    changeAmount: -0.59,
    volume: 9870000,
    marketCap: 200000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Disney+ subscriber growth beats estimates", source: "CNBC", timestamp: "2026-07-18T19:20:00Z", url: "#" },
      { id: "n2", headline: "Disney parks segment posts record attendance", source: "Reuters", timestamp: "2026-07-13T14:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 1.45, epsActual: null, revenueEstimate: "23.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 56, negative: 44, mentionVolume: 4120 },
      reddit: { positive: 51, negative: 49, mentionVolume: 1670 },
      stocktwits: { positive: 59, negative: 41, mentionVolume: 2340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  WMT: {
    ticker: "WMT",
    name: "Walmart Inc.",
    nameKo: "월마트",
    price: 92.3,
    changePercent: 0.38,
    changeAmount: 0.35,
    volume: 15230000,
    marketCap: 780000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Walmart e-commerce growth outpaces store sales", source: "Reuters", timestamp: "2026-07-19T06:00:00Z", url: "#" },
      { id: "n2", headline: "Walmart expands same-day delivery coverage", source: "CNBC", timestamp: "2026-07-12T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-20", reportTime: "BMO", epsEstimate: 0.72, epsActual: null, revenueEstimate: "175.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 58, negative: 42, mentionVolume: 2870 },
      reddit: { positive: 53, negative: 47, mentionVolume: 1120 },
      stocktwits: { positive: 61, negative: 39, mentionVolume: 1650 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  COST: {
    ticker: "COST",
    name: "Costco Wholesale Corporation",
    nameKo: "코스트코",
    price: 985.7,
    changePercent: 1.08,
    changeAmount: 10.54,
    volume: 1980000,
    marketCap: 440000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Costco monthly sales growth remains resilient", source: "Reuters", timestamp: "2026-07-18T21:15:00Z", url: "#" },
      { id: "n2", headline: "Costco membership fee hike boosts revenue outlook", source: "Bloomberg", timestamp: "2026-07-11T10:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-24", reportTime: "AMC", epsEstimate: 5.15, epsActual: null, revenueEstimate: "62.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 68, negative: 32, mentionVolume: 3450 },
      reddit: { positive: 63, negative: 37, mentionVolume: 1450 },
      stocktwits: { positive: 71, negative: 29, mentionVolume: 2010 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  MU: {
    ticker: "MU",
    name: "Micron Technology, Inc.",
    nameKo: "마이크론",
    price: 128.5,
    changePercent: 2.35,
    changeAmount: 2.95,
    volume: 21340000,
    marketCap: 142000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Micron HBM memory orders extend into next year", source: "Reuters", timestamp: "2026-07-19T07:30:00Z", url: "#" },
      { id: "n2", headline: "Micron raises capex guidance on AI memory demand", source: "Bloomberg", timestamp: "2026-07-14T09:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-24", reportTime: "AMC", epsEstimate: 2.45, epsActual: null, revenueEstimate: "9.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 66, negative: 34, mentionVolume: 5230 },
      reddit: { positive: 60, negative: 40, mentionVolume: 2010 },
      stocktwits: { positive: 69, negative: 31, mentionVolume: 3120 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  TSM: {
    ticker: "TSM",
    name: "Taiwan Semiconductor Manufacturing Company Limited",
    nameKo: "TSMC",
    price: 198.7,
    changePercent: 1.15,
    changeAmount: 2.26,
    volume: 12450000,
    marketCap: 980000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "TSMC advanced node capacity fully booked through 2027", source: "Reuters", timestamp: "2026-07-19T04:50:00Z", url: "#" },
      { id: "n2", headline: "TSMC Arizona fab yields match Taiwan facilities", source: "Nikkei Asia", timestamp: "2026-07-12T08:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-16", reportTime: "BMO", epsEstimate: 2.15, epsActual: null, revenueEstimate: "26.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 73, negative: 27, mentionVolume: 6210 },
      reddit: { positive: 67, negative: 33, mentionVolume: 2340 },
      stocktwits: { positive: 76, negative: 24, mentionVolume: 3450 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  TM: {
    ticker: "TM",
    name: "Toyota Motor Corporation",
    nameKo: "도요타",
    price: 198.2,
    changePercent: -0.4,
    changeAmount: -0.8,
    volume: 1230000,
    marketCap: 245000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Toyota hybrid sales continue to outpace full-EV rivals", source: "Reuters", timestamp: "2026-07-18T22:10:00Z", url: "#" },
      { id: "n2", headline: "Toyota expands solid-state battery pilot line", source: "Nikkei Asia", timestamp: "2026-07-11T07:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 3.1, epsActual: null, revenueEstimate: "84.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 1780 },
      reddit: { positive: 50, negative: 50, mentionVolume: 720 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  STLA: {
    ticker: "STLA",
    name: "Stellantis N.V.",
    nameKo: "스텔란티스",
    price: 14.35,
    changePercent: -1.2,
    changeAmount: -0.17,
    volume: 8760000,
    marketCap: 46000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Stellantis cuts production at North American plants", source: "Reuters", timestamp: "2026-07-18T18:00:00Z", url: "#" },
      { id: "n2", headline: "Stellantis reshuffles EV platform strategy", source: "Automotive News", timestamp: "2026-07-10T09:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 0.85, epsActual: null, revenueEstimate: "42.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 41, negative: 59, mentionVolume: 1670 },
      reddit: { positive: 36, negative: 64, mentionVolume: 780 },
      stocktwits: { positive: 44, negative: 56, mentionVolume: 1120 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "구조조정 자금 조달 과정에서 일부 희석 여지 존재." }
    }
  },
  MA: {
    ticker: "MA",
    name: "Mastercard Incorporated",
    nameKo: "마스터카드",
    price: 512.8,
    changePercent: 0.55,
    changeAmount: 2.81,
    volume: 2340000,
    marketCap: 475000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Mastercard cross-border volumes climb on travel rebound", source: "Reuters", timestamp: "2026-07-19T06:10:00Z", url: "#" },
      { id: "n2", headline: "Mastercard expands tokenization partnerships", source: "PYMNTS", timestamp: "2026-07-13T10:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-31", reportTime: "BMO", epsEstimate: 3.9, epsActual: null, revenueEstimate: "7.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 64, negative: 36, mentionVolume: 2670 },
      reddit: { positive: 58, negative: 42, mentionVolume: 980 },
      stocktwits: { positive: 67, negative: 33, mentionVolume: 1450 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  GS: {
    ticker: "GS",
    name: "The Goldman Sachs Group, Inc.",
    nameKo: "골드만삭스",
    price: 615.4,
    changePercent: 0.85,
    changeAmount: 5.19,
    volume: 1870000,
    marketCap: 205000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Goldman Sachs investment banking fees rebound sharply", source: "Reuters", timestamp: "2026-07-19T07:20:00Z", url: "#" },
      { id: "n2", headline: "Goldman Sachs trading desk posts strong quarter", source: "Bloomberg", timestamp: "2026-07-14T11:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-14", reportTime: "BMO", epsEstimate: 9.85, epsActual: null, revenueEstimate: "13.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 59, negative: 41, mentionVolume: 1980 },
      reddit: { positive: 53, negative: 47, mentionVolume: 720 },
      stocktwits: { positive: 62, negative: 38, mentionVolume: 1120 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형 투자은행으로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  LLY: {
    ticker: "LLY",
    name: "Eli Lilly and Company",
    nameKo: "일라이릴리",
    price: 895.6,
    changePercent: 1.65,
    changeAmount: 14.54,
    volume: 3120000,
    marketCap: 850000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Eli Lilly obesity drug trial shows strong late-stage results", source: "Reuters", timestamp: "2026-07-19T06:40:00Z", url: "#" },
      { id: "n2", headline: "Eli Lilly expands manufacturing capacity for GLP-1 drugs", source: "STAT News", timestamp: "2026-07-12T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 5.65, epsActual: null, revenueEstimate: "14.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 70, negative: 30, mentionVolume: 4560 },
      reddit: { positive: 64, negative: 36, mentionVolume: 1670 },
      stocktwits: { positive: 73, negative: 27, mentionVolume: 2340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  MRK: {
    ticker: "MRK",
    name: "Merck & Co., Inc.",
    nameKo: "머크",
    price: 98.2,
    changePercent: -0.3,
    changeAmount: -0.29,
    volume: 9870000,
    marketCap: 250000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Merck Keytruda patent cliff concerns weigh on shares", source: "Reuters", timestamp: "2026-07-18T14:50:00Z", url: "#" },
      { id: "n2", headline: "Merck advances new oncology combination therapy", source: "Endpoints News", timestamp: "2026-07-10T10:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 2.15, epsActual: null, revenueEstimate: "16.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 48, negative: 52, mentionVolume: 2340 },
      reddit: { positive: 43, negative: 57, mentionVolume: 890 },
      stocktwits: { positive: 51, negative: 49, mentionVolume: 1230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  UAA: {
    ticker: "UAA",
    name: "Under Armour, Inc.",
    nameKo: "언더아머",
    price: 7.85,
    changePercent: -2.1,
    changeAmount: -0.17,
    volume: 6120000,
    marketCap: 3500000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Under Armour turnaround plan shows early signs of progress", source: "CNBC", timestamp: "2026-07-18T15:20:00Z", url: "#" },
      { id: "n2", headline: "Under Armour cuts SKU count to focus on core lines", source: "Retail Dive", timestamp: "2026-07-11T09:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-13", reportTime: "BMO", epsEstimate: -0.02, epsActual: null, revenueEstimate: "1.0B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 39, negative: 61, mentionVolume: 1230 },
      reddit: { positive: 34, negative: 66, mentionVolume: 560 },
      stocktwits: { positive: 42, negative: 58, mentionVolume: 780 }
    },
    risk: {
      dilution: { level: "medium", description: "실적 회복 지연 시 운영자금 확보 목적의 유상증자 가능성 존재." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "구조조정 비용 충당을 위한 신주 발행 여지가 일부 있음." }
    }
  },
  IBM: {
    ticker: "IBM",
    name: "International Business Machines Corporation",
    nameKo: "IBM",
    price: 231.4,
    changePercent: 0.65,
    changeAmount: 1.49,
    volume: 4560000,
    marketCap: 212000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "IBM hybrid cloud and consulting bookings accelerate", source: "Reuters", timestamp: "2026-07-19T07:50:00Z", url: "#" },
      { id: "n2", headline: "IBM quantum roadmap hits next milestone", source: "TechCrunch", timestamp: "2026-07-14T10:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-23", reportTime: "AMC", epsEstimate: 2.45, epsActual: null, revenueEstimate: "16.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 1980 },
      reddit: { positive: 50, negative: 50, mentionVolume: 780 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 1120 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  CSCO: {
    ticker: "CSCO",
    name: "Cisco Systems, Inc.",
    nameKo: "시스코",
    price: 68.9,
    changePercent: 0.42,
    changeAmount: 0.29,
    volume: 15230000,
    marketCap: 275000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Cisco AI networking orders climb for third straight quarter", source: "Reuters", timestamp: "2026-07-19T06:25:00Z", url: "#" },
      { id: "n2", headline: "Cisco expands security portfolio with new acquisition", source: "CRN", timestamp: "2026-07-12T09:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-13", reportTime: "AMC", epsEstimate: 0.98, epsActual: null, revenueEstimate: "14.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 57, negative: 43, mentionVolume: 1670 },
      reddit: { positive: 52, negative: 48, mentionVolume: 650 },
      stocktwits: { positive: 60, negative: 40, mentionVolume: 940 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  COP: {
    ticker: "COP",
    name: "ConocoPhillips",
    nameKo: "코노코필립스",
    price: 108.75,
    changePercent: 0.9,
    changeAmount: 0.97,
    volume: 6120000,
    marketCap: 130000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "ConocoPhillips boosts Permian production guidance", source: "Reuters", timestamp: "2026-07-19T05:35:00Z", url: "#" },
      { id: "n2", headline: "ConocoPhillips completes asset integration ahead of schedule", source: "WSJ", timestamp: "2026-07-11T08:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 1.85, epsActual: null, revenueEstimate: "15.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 52, negative: 48, mentionVolume: 1450 },
      reddit: { positive: 47, negative: 53, mentionVolume: 610 },
      stocktwits: { positive: 55, negative: 45, mentionVolume: 870 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  CMCSA: {
    ticker: "CMCSA",
    name: "Comcast Corporation",
    nameKo: "컴캐스트",
    price: 41.2,
    changePercent: -0.55,
    changeAmount: -0.23,
    volume: 18230000,
    marketCap: 155000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Comcast broadband subscriber losses narrow", source: "Reuters", timestamp: "2026-07-18T20:00:00Z", url: "#" },
      { id: "n2", headline: "Comcast theme park segment posts record revenue", source: "Variety", timestamp: "2026-07-13T13:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "BMO", epsEstimate: 0.98, epsActual: null, revenueEstimate: "30.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 46, negative: 54, mentionVolume: 1670 },
      reddit: { positive: 41, negative: 59, mentionVolume: 720 },
      stocktwits: { positive: 49, negative: 51, mentionVolume: 980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  TGT: {
    ticker: "TGT",
    name: "Target Corporation",
    nameKo: "타겟",
    price: 142.6,
    changePercent: -1.8,
    changeAmount: -2.61,
    volume: 5230000,
    marketCap: 65000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Target same-store sales miss on discretionary weakness", source: "CNBC", timestamp: "2026-07-19T06:55:00Z", url: "#" },
      { id: "n2", headline: "Target expands same-day delivery partnerships", source: "Reuters", timestamp: "2026-07-12T10:05:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-20", reportTime: "BMO", epsEstimate: 1.85, epsActual: null, revenueEstimate: "25.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 44, negative: 56, mentionVolume: 1980 },
      reddit: { positive: 39, negative: 61, mentionVolume: 890 },
      stocktwits: { positive: 47, negative: 53, mentionVolume: 1230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  KO: {
    ticker: "KO",
    name: "The Coca-Cola Company",
    nameKo: "코카콜라",
    price: 68.3,
    changePercent: 0.25,
    changeAmount: 0.17,
    volume: 12340000,
    marketCap: 295000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Coca-Cola volume growth steady in emerging markets", source: "Reuters", timestamp: "2026-07-19T05:15:00Z", url: "#" },
      { id: "n2", headline: "Coca-Cola expands zero-sugar product lineup", source: "Food Dive", timestamp: "2026-07-10T09:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-22", reportTime: "BMO", epsEstimate: 0.85, epsActual: null, revenueEstimate: "12.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 60, negative: 40, mentionVolume: 2010 },
      reddit: { positive: 55, negative: 45, mentionVolume: 890 },
      stocktwits: { positive: 63, negative: 37, mentionVolume: 1230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  ARM: {
    ticker: "ARM",
    name: "Arm Holdings plc",
    nameKo: "ARM 홀딩스",
    price: 145.2,
    changePercent: 3.1,
    changeAmount: 4.37,
    volume: 6120000,
    marketCap: 150000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Arm CPU designs gain share in AI server market", source: "Reuters", timestamp: "2026-07-19T07:10:00Z", url: "#" },
      { id: "n2", headline: "Arm expands licensing deals with major cloud providers", source: "Bloomberg", timestamp: "2026-07-13T09:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: 0.42, epsActual: null, revenueEstimate: "0.95B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 68, negative: 32, mentionVolume: 3210 },
      reddit: { positive: 61, negative: 39, mentionVolume: 1120 },
      stocktwits: { positive: 71, negative: 29, mentionVolume: 1670 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "임직원 보상 관련 신주 발행이 꾸준히 발생." }
    }
  },
  ON: {
    ticker: "ON",
    name: "ON Semiconductor Corporation",
    nameKo: "온세미컨덕터",
    price: 68.4,
    changePercent: -1.05,
    changeAmount: -0.73,
    volume: 8340000,
    marketCap: 29000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "ON Semiconductor EV chip demand softens near-term", source: "Reuters", timestamp: "2026-07-18T16:30:00Z", url: "#" },
      { id: "n2", headline: "ON Semiconductor expands silicon carbide capacity", source: "EE Times", timestamp: "2026-07-11T08:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-04", reportTime: "AMC", epsEstimate: 0.68, epsActual: null, revenueEstimate: "1.75B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 47, negative: 53, mentionVolume: 1450 },
      reddit: { positive: 42, negative: 58, mentionVolume: 620 },
      stocktwits: { positive: 50, negative: 50, mentionVolume: 890 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  MRVL: {
    ticker: "MRVL",
    name: "Marvell Technology, Inc.",
    nameKo: "마벨 테크놀로지",
    price: 82.6,
    changePercent: 1.85,
    changeAmount: 1.5,
    volume: 9870000,
    marketCap: 72000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Marvell custom AI silicon wins new hyperscaler design", source: "Reuters", timestamp: "2026-07-19T06:50:00Z", url: "#" },
      { id: "n2", headline: "Marvell data center revenue grows double digits", source: "Barron's", timestamp: "2026-07-14T09:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-28", reportTime: "AMC", epsEstimate: 0.52, epsActual: null, revenueEstimate: "1.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 65, negative: 35, mentionVolume: 2340 },
      reddit: { positive: 59, negative: 41, mentionVolume: 980 },
      stocktwits: { positive: 68, negative: 32, mentionVolume: 1340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "인수 관련 주식 발행 이력이 있어 일부 희석 여지 존재." }
    }
  },
  HMC: {
    ticker: "HMC",
    name: "Honda Motor Co., Ltd.",
    nameKo: "혼다",
    price: 34.75,
    changePercent: 0.3,
    changeAmount: 0.1,
    volume: 2340000,
    marketCap: 55000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Honda hybrid lineup expansion boosts North America sales", source: "Reuters", timestamp: "2026-07-18T21:40:00Z", url: "#" },
      { id: "n2", headline: "Honda and partner advance next-gen battery research", source: "Nikkei Asia", timestamp: "2026-07-10T07:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-07", reportTime: "BMO", epsEstimate: 0.95, epsActual: null, revenueEstimate: "38.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 52, negative: 48, mentionVolume: 980 },
      reddit: { positive: 48, negative: 52, mentionVolume: 420 },
      stocktwits: { positive: 55, negative: 45, mentionVolume: 610 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  AXP: {
    ticker: "AXP",
    name: "American Express Company",
    nameKo: "아메리칸 익스프레스",
    price: 298.5,
    changePercent: 0.72,
    changeAmount: 2.13,
    volume: 2120000,
    marketCap: 215000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "American Express card member spending stays resilient", source: "Reuters", timestamp: "2026-07-19T07:15:00Z", url: "#" },
      { id: "n2", headline: "Amex expands premium travel card benefits", source: "CNBC", timestamp: "2026-07-13T10:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-25", reportTime: "BMO", epsEstimate: 3.85, epsActual: null, revenueEstimate: "17.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 61, negative: 39, mentionVolume: 1560 },
      reddit: { positive: 56, negative: 44, mentionVolume: 610 },
      stocktwits: { positive: 64, negative: 36, mentionVolume: 890 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  SCHW: {
    ticker: "SCHW",
    name: "The Charles Schwab Corporation",
    nameKo: "찰스슈왑",
    price: 88.2,
    changePercent: 0.55,
    changeAmount: 0.48,
    volume: 7120000,
    marketCap: 155000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Charles Schwab client asset growth accelerates", source: "Reuters", timestamp: "2026-07-18T17:20:00Z", url: "#" },
      { id: "n2", headline: "Schwab net new brokerage accounts beat estimates", source: "Bloomberg", timestamp: "2026-07-12T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-21", reportTime: "BMO", epsEstimate: 1.12, epsActual: null, revenueEstimate: "5.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 58, negative: 42, mentionVolume: 1230 },
      reddit: { positive: 53, negative: 47, mentionVolume: 540 },
      stocktwits: { positive: 61, negative: 39, mentionVolume: 780 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  ABBV: {
    ticker: "ABBV",
    name: "AbbVie Inc.",
    nameKo: "애브비",
    price: 198.4,
    changePercent: -0.45,
    changeAmount: -0.9,
    volume: 5230000,
    marketCap: 350000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "AbbVie immunology drug portfolio offsets Humira decline", source: "Reuters", timestamp: "2026-07-18T14:10:00Z", url: "#" },
      { id: "n2", headline: "AbbVie advances new oncology pipeline candidate", source: "Endpoints News", timestamp: "2026-07-11T09:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-31", reportTime: "BMO", epsEstimate: 3.15, epsActual: null, revenueEstimate: "14.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 1670 },
      reddit: { positive: 49, negative: 51, mentionVolume: 720 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  CVS: {
    ticker: "CVS",
    name: "CVS Health Corporation",
    nameKo: "CVS헬스",
    price: 68.9,
    changePercent: 1.2,
    changeAmount: 0.82,
    volume: 8760000,
    marketCap: 88000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "CVS Health insurance segment margins improve", source: "Reuters", timestamp: "2026-07-19T06:20:00Z", url: "#" },
      { id: "n2", headline: "CVS expands in-store clinic footprint", source: "Fierce Healthcare", timestamp: "2026-07-12T08:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 1.45, epsActual: null, revenueEstimate: "91.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 50, negative: 50, mentionVolume: 1120 },
      reddit: { positive: 45, negative: 55, mentionVolume: 480 },
      stocktwits: { positive: 53, negative: 47, mentionVolume: 670 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  DECK: {
    ticker: "DECK",
    name: "Deckers Brands",
    nameKo: "데커스 브랜즈",
    price: 178.3,
    changePercent: -2.8,
    changeAmount: -5.13,
    volume: 1670000,
    marketCap: 28000000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Deckers Hoka brand growth decelerates in North America", source: "CNBC", timestamp: "2026-07-18T15:50:00Z", url: "#" },
      { id: "n2", headline: "Deckers Ugg holds steady on international expansion", source: "Retail Dive", timestamp: "2026-07-11T09:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "AMC", epsEstimate: 0.68, epsActual: null, revenueEstimate: "0.95B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 46, negative: 54, mentionVolume: 1010 },
      reddit: { positive: 41, negative: 59, mentionVolume: 460 },
      stocktwits: { positive: 49, negative: 51, mentionVolume: 620 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  NOW: {
    ticker: "NOW",
    name: "ServiceNow, Inc.",
    nameKo: "서비스나우",
    price: 985.6,
    changePercent: 1.35,
    changeAmount: 13.14,
    volume: 1450000,
    marketCap: 205000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "ServiceNow AI agent adoption accelerates among large enterprises", source: "TechCrunch", timestamp: "2026-07-19T07:40:00Z", url: "#" },
      { id: "n2", headline: "ServiceNow raises full-year subscription revenue guidance", source: "Reuters", timestamp: "2026-07-14T10:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-23", reportTime: "AMC", epsEstimate: 3.75, epsActual: null, revenueEstimate: "3.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 69, negative: 31, mentionVolume: 2340 },
      reddit: { positive: 63, negative: 37, mentionVolume: 890 },
      stocktwits: { positive: 72, negative: 28, mentionVolume: 1230 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "스톡옵션 기반 보상 비중이 있어 지속적 소폭 희석 가능성 있음." }
    }
  },
  ADBE: {
    ticker: "ADBE",
    name: "Adobe Inc.",
    nameKo: "어도비",
    price: 512.4,
    changePercent: -0.65,
    changeAmount: -3.35,
    volume: 2870000,
    marketCap: 230000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Adobe Firefly AI credits usage climbs among creative pros", source: "Reuters", timestamp: "2026-07-19T06:05:00Z", url: "#" },
      { id: "n2", headline: "Adobe Creative Cloud subscriber growth steady", source: "The Verge", timestamp: "2026-07-13T09:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-09-11", reportTime: "AMC", epsEstimate: 5.15, epsActual: null, revenueEstimate: "5.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 56, negative: 44, mentionVolume: 1890 },
      reddit: { positive: 51, negative: 49, mentionVolume: 780 },
      stocktwits: { positive: 59, negative: 41, mentionVolume: 1010 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  EOG: {
    ticker: "EOG",
    name: "EOG Resources, Inc.",
    nameKo: "EOG 리소시스",
    price: 128.9,
    changePercent: 0.85,
    changeAmount: 1.09,
    volume: 3340000,
    marketCap: 72000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "EOG Resources raises production guidance on strong well results", source: "Reuters", timestamp: "2026-07-19T05:25:00Z", url: "#" },
      { id: "n2", headline: "EOG expands Eagle Ford drilling program", source: "Hart Energy", timestamp: "2026-07-10T08:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-07", reportTime: "BMO", epsEstimate: 2.65, epsActual: null, revenueEstimate: "6.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 53, negative: 47, mentionVolume: 890 },
      reddit: { positive: 48, negative: 52, mentionVolume: 390 },
      stocktwits: { positive: 56, negative: 44, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  WBD: {
    ticker: "WBD",
    name: "Warner Bros. Discovery, Inc.",
    nameKo: "워너브라더스 디스커버리",
    price: 11.45,
    changePercent: -3.2,
    changeAmount: -0.38,
    volume: 21230000,
    marketCap: 28000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Warner Bros. Discovery streaming losses narrow further", source: "Variety", timestamp: "2026-07-18T19:50:00Z", url: "#" },
      { id: "n2", headline: "WBD explores strategic options for cable networks", source: "Reuters", timestamp: "2026-07-12T13:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-07", reportTime: "BMO", epsEstimate: -0.12, epsActual: null, revenueEstimate: "9.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 38, negative: 62, mentionVolume: 2340 },
      reddit: { positive: 33, negative: 67, mentionVolume: 1120 },
      stocktwits: { positive: 41, negative: 59, mentionVolume: 1450 }
    },
    risk: {
      dilution: { level: "medium", description: "구조조정 및 부채 상환 목적의 자금 조달 가능성 존재." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "사업 분할·재편 과정에서 신주 발행 여지가 있음." }
    }
  },
  SBUX: {
    ticker: "SBUX",
    name: "Starbucks Corporation",
    nameKo: "스타벅스",
    price: 92.6,
    changePercent: 0.4,
    changeAmount: 0.37,
    volume: 7120000,
    marketCap: 105000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Starbucks same-store sales show signs of stabilizing", source: "Reuters", timestamp: "2026-07-19T06:30:00Z", url: "#" },
      { id: "n2", headline: "Starbucks rolls out new store efficiency initiative", source: "CNBC", timestamp: "2026-07-13T10:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "AMC", epsEstimate: 0.62, epsActual: null, revenueEstimate: "9.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 1780 },
      reddit: { positive: 50, negative: 50, mentionVolume: 780 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 1010 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  MCD: {
    ticker: "MCD",
    name: "McDonald's Corporation",
    nameKo: "맥도날드",
    price: 298.75,
    changePercent: 0.25,
    changeAmount: 0.75,
    volume: 2340000,
    marketCap: 215000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "McDonald's value menu drives traffic recovery", source: "Reuters", timestamp: "2026-07-19T05:50:00Z", url: "#" },
      { id: "n2", headline: "McDonald's international same-store sales beat estimates", source: "CNBC", timestamp: "2026-07-11T09:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 3.15, epsActual: null, revenueEstimate: "6.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 59, negative: 41, mentionVolume: 1450 },
      reddit: { positive: 54, negative: 46, mentionVolume: 610 },
      stocktwits: { positive: 62, negative: 38, mentionVolume: 890 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  LRCX: {
    ticker: "LRCX",
    name: "Lam Research Corporation",
    nameKo: "램리서치",
    price: 92.4,
    changePercent: 1.55,
    changeAmount: 1.41,
    volume: 6120000,
    marketCap: 120000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Lam Research etch tool orders climb on memory upcycle", source: "Reuters", timestamp: "2026-07-19T07:00:00Z", url: "#" },
      { id: "n2", headline: "Lam Research expands service revenue base", source: "Barron's", timestamp: "2026-07-13T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-30", reportTime: "AMC", epsEstimate: 0.98, epsActual: null, revenueEstimate: "4.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 63, negative: 37, mentionVolume: 1450 },
      reddit: { positive: 57, negative: 43, mentionVolume: 610 },
      stocktwits: { positive: 66, negative: 34, mentionVolume: 890 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  KLAC: {
    ticker: "KLAC",
    name: "KLA Corporation",
    nameKo: "KLA",
    price: 785.3,
    changePercent: 2.1,
    changeAmount: 16.15,
    volume: 980000,
    marketCap: 105000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "KLA process control demand strong amid advanced node ramp", source: "Reuters", timestamp: "2026-07-19T06:40:00Z", url: "#" },
      { id: "n2", headline: "KLA raises quarterly dividend", source: "Bloomberg", timestamp: "2026-07-11T08:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-30", reportTime: "AMC", epsEstimate: 7.85, epsActual: null, revenueEstimate: "2.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 65, negative: 35, mentionVolume: 720 },
      reddit: { positive: 59, negative: 41, mentionVolume: 310 },
      stocktwits: { positive: 68, negative: 32, mentionVolume: 450 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  AMAT: {
    ticker: "AMAT",
    name: "Applied Materials, Inc.",
    nameKo: "어플라이드 머티어리얼즈",
    price: 198.6,
    changePercent: -0.85,
    changeAmount: -1.7,
    volume: 5230000,
    marketCap: 165000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Applied Materials China revenue faces export control headwinds", source: "Reuters", timestamp: "2026-07-18T16:10:00Z", url: "#" },
      { id: "n2", headline: "Applied Materials unveils next-gen deposition tool", source: "EE Times", timestamp: "2026-07-12T09:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-14", reportTime: "AMC", epsEstimate: 2.35, epsActual: null, revenueEstimate: "7.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 1670 },
      reddit: { positive: 49, negative: 51, mentionVolume: 720 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 940 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  APTV: {
    ticker: "APTV",
    name: "Aptiv PLC",
    nameKo: "앱티브",
    price: 68.9,
    changePercent: 0.45,
    changeAmount: 0.31,
    volume: 2340000,
    marketCap: 16000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Aptiv wins new EV wiring harness contracts", source: "Reuters", timestamp: "2026-07-18T20:20:00Z", url: "#" },
      { id: "n2", headline: "Aptiv software-defined vehicle unit gains traction", source: "Automotive News", timestamp: "2026-07-11T08:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-05", reportTime: "BMO", epsEstimate: 1.85, epsActual: null, revenueEstimate: "4.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 50, negative: 50, mentionVolume: 610 },
      reddit: { positive: 46, negative: 54, mentionVolume: 280 },
      stocktwits: { positive: 53, negative: 47, mentionVolume: 390 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  PYPL: {
    ticker: "PYPL",
    name: "PayPal Holdings, Inc.",
    nameKo: "페이팔",
    price: 74.2,
    changePercent: -1.6,
    changeAmount: -1.21,
    volume: 12340000,
    marketCap: 72000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "PayPal branded checkout volume growth slows", source: "Reuters", timestamp: "2026-07-19T06:15:00Z", url: "#" },
      { id: "n2", headline: "PayPal expands stablecoin payment rails", source: "CoinDesk", timestamp: "2026-07-13T10:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 1.15, epsActual: null, revenueEstimate: "8.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 47, negative: 53, mentionVolume: 1780 },
      reddit: { positive: 42, negative: 58, mentionVolume: 780 },
      stocktwits: { positive: 50, negative: 50, mentionVolume: 1010 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  BLK: {
    ticker: "BLK",
    name: "BlackRock, Inc.",
    nameKo: "블랙록",
    price: 985.4,
    changePercent: 0.75,
    changeAmount: 7.34,
    volume: 610000,
    marketCap: 150000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "BlackRock AUM hits record on ETF inflows", source: "Reuters", timestamp: "2026-07-19T07:25:00Z", url: "#" },
      { id: "n2", headline: "BlackRock expands private markets platform", source: "Bloomberg", timestamp: "2026-07-14T09:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-10", reportTime: "BMO", epsEstimate: 11.2, epsActual: null, revenueEstimate: "5.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 62, negative: 38, mentionVolume: 940 },
      reddit: { positive: 57, negative: 43, mentionVolume: 410 },
      stocktwits: { positive: 65, negative: 35, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  BMY: {
    ticker: "BMY",
    name: "Bristol-Myers Squibb Company",
    nameKo: "브리스톨마이어스스퀴브",
    price: 52.8,
    changePercent: -0.35,
    changeAmount: -0.19,
    volume: 8120000,
    marketCap: 108000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Bristol-Myers Squibb schizophrenia drug sales ramp faster than expected", source: "Reuters", timestamp: "2026-07-18T14:30:00Z", url: "#" },
      { id: "n2", headline: "BMS advances new cell therapy pipeline candidate", source: "Endpoints News", timestamp: "2026-07-10T09:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-31", reportTime: "BMO", epsEstimate: 1.25, epsActual: null, revenueEstimate: "11.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 51, negative: 49, mentionVolume: 780 },
      reddit: { positive: 46, negative: 54, mentionVolume: 340 },
      stocktwits: { positive: 54, negative: 46, mentionVolume: 480 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  GILD: {
    ticker: "GILD",
    name: "Gilead Sciences, Inc.",
    nameKo: "길리어드 사이언스",
    price: 98.6,
    changePercent: 0.6,
    changeAmount: 0.59,
    volume: 6120000,
    marketCap: 122000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Gilead HIV prevention drug sees strong launch uptake", source: "Reuters", timestamp: "2026-07-19T06:00:00Z", url: "#" },
      { id: "n2", headline: "Gilead oncology pipeline advances into late-stage trials", source: "STAT News", timestamp: "2026-07-12T08:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-04", reportTime: "AMC", epsEstimate: 1.95, epsActual: null, revenueEstimate: "7.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 58, negative: 42, mentionVolume: 890 },
      reddit: { positive: 53, negative: 47, mentionVolume: 390 },
      stocktwits: { positive: 61, negative: 39, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  RL: {
    ticker: "RL",
    name: "Ralph Lauren Corporation",
    nameKo: "랄프로렌",
    price: 245.7,
    changePercent: -1.1,
    changeAmount: -2.73,
    volume: 780000,
    marketCap: 15000000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Ralph Lauren luxury segment outperforms broader apparel market", source: "WWD", timestamp: "2026-07-18T15:10:00Z", url: "#" },
      { id: "n2", headline: "Ralph Lauren expands direct-to-consumer channel investment", source: "Reuters", timestamp: "2026-07-11T09:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 2.65, epsActual: null, revenueEstimate: "1.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 52, negative: 48, mentionVolume: 520 },
      reddit: { positive: 47, negative: 53, mentionVolume: 230 },
      stocktwits: { positive: 55, negative: 45, mentionVolume: 340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  INTU: {
    ticker: "INTU",
    name: "Intuit Inc.",
    nameKo: "인튜이트",
    price: 685.3,
    changePercent: 1.2,
    changeAmount: 8.13,
    volume: 1120000,
    marketCap: 195000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Intuit AI-driven QuickBooks features drive upsell", source: "Reuters", timestamp: "2026-07-19T07:35:00Z", url: "#" },
      { id: "n2", headline: "Intuit TurboTax platform expands year-round finance tools", source: "TechCrunch", timestamp: "2026-07-14T10:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-21", reportTime: "AMC", epsEstimate: 2.85, epsActual: null, revenueEstimate: "3.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 60, negative: 40, mentionVolume: 780 },
      reddit: { positive: 55, negative: 45, mentionVolume: 340 },
      stocktwits: { positive: 63, negative: 37, mentionVolume: 480 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  PANW: {
    ticker: "PANW",
    name: "Palo Alto Networks, Inc.",
    nameKo: "팔로알토네트웍스",
    price: 198.4,
    changePercent: 2.45,
    changeAmount: 4.75,
    volume: 4560000,
    marketCap: 130000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Palo Alto Networks platformization strategy boosts ARR growth", source: "Reuters", timestamp: "2026-07-19T06:45:00Z", url: "#" },
      { id: "n2", headline: "Palo Alto Networks expands AI-driven SOC offerings", source: "CRN", timestamp: "2026-07-13T09:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-18", reportTime: "AMC", epsEstimate: 1.65, epsActual: null, revenueEstimate: "2.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 67, negative: 33, mentionVolume: 1780 },
      reddit: { positive: 61, negative: 39, mentionVolume: 780 },
      stocktwits: { positive: 70, negative: 30, mentionVolume: 1010 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "인수 관련 주식 발행 이력이 있어 일부 희석 여지 존재." }
    }
  },
  UBER: {
    ticker: "UBER",
    name: "Uber Technologies, Inc.",
    nameKo: "우버",
    price: 82.6,
    changePercent: 0.9,
    changeAmount: 0.74,
    volume: 15230000,
    marketCap: 172000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Uber gross bookings growth beats estimates on delivery strength", source: "Reuters", timestamp: "2026-07-19T06:55:00Z", url: "#" },
      { id: "n2", headline: "Uber expands autonomous vehicle partnerships", source: "TechCrunch", timestamp: "2026-07-12T10:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "BMO", epsEstimate: 0.68, epsActual: null, revenueEstimate: "12.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 61, negative: 39, mentionVolume: 3210 },
      reddit: { positive: 55, negative: 45, mentionVolume: 1340 },
      stocktwits: { positive: 64, negative: 36, mentionVolume: 1780 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  OXY: {
    ticker: "OXY",
    name: "Occidental Petroleum Corporation",
    nameKo: "옥시덴탈 페트롤리엄",
    price: 52.4,
    changePercent: 1.15,
    changeAmount: 0.6,
    volume: 9870000,
    marketCap: 46000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "Occidental Petroleum accelerates debt paydown plan", source: "Reuters", timestamp: "2026-07-19T05:45:00Z", url: "#" },
      { id: "n2", headline: "Occidental expands direct air capture project funding", source: "WSJ", timestamp: "2026-07-11T08:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-11", reportTime: "AMC", epsEstimate: 0.65, epsActual: null, revenueEstimate: "6.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 49, negative: 51, mentionVolume: 980 },
      reddit: { positive: 44, negative: 56, mentionVolume: 420 },
      stocktwits: { positive: 52, negative: 48, mentionVolume: 610 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "대규모 인수 부채 상환 과정에서 자본 조달 여지 일부 존재." }
    }
  },
  LYV: {
    ticker: "LYV",
    name: "Live Nation Entertainment, Inc.",
    nameKo: "라이브네이션",
    price: 138.2,
    changePercent: -0.65,
    changeAmount: -0.9,
    volume: 1670000,
    marketCap: 30000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Live Nation concert attendance sets new summer record", source: "Variety", timestamp: "2026-07-18T19:00:00Z", url: "#" },
      { id: "n2", headline: "Live Nation faces continued antitrust scrutiny", source: "Reuters", timestamp: "2026-07-12T13:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: 0.85, epsActual: null, revenueEstimate: "6.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 53, negative: 47, mentionVolume: 890 },
      reddit: { positive: 48, negative: 52, mentionVolume: 390 },
      stocktwits: { positive: 56, negative: 44, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "medium", description: "반독점 소송 결과에 따라 사업 구조 변경 및 상장 요건 관련 불확실성 존재." },
      shareDilutionRisk: { level: "low", description: "신주 발행을 통한 희석 위험 낮음." }
    }
  },
  PEP: {
    ticker: "PEP",
    name: "PepsiCo, Inc.",
    nameKo: "펩시코",
    price: 142.8,
    changePercent: 0.3,
    changeAmount: 0.43,
    volume: 5230000,
    marketCap: 198000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "PepsiCo snack division sales stay resilient", source: "Reuters", timestamp: "2026-07-19T05:55:00Z", url: "#" },
      { id: "n2", headline: "PepsiCo expands better-for-you product portfolio", source: "Food Dive", timestamp: "2026-07-10T08:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-22", reportTime: "BMO", epsEstimate: 2.15, epsActual: null, revenueEstimate: "22.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 57, negative: 43, mentionVolume: 1120 },
      reddit: { positive: 52, negative: 48, mentionVolume: 480 },
      stocktwits: { positive: 60, negative: 40, mentionVolume: 670 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  NXPI: {
    ticker: "NXPI",
    name: "NXP Semiconductors N.V.",
    nameKo: "NXP 반도체",
    price: 218.4,
    changePercent: 1.35,
    changeAmount: 2.91,
    volume: 2340000,
    marketCap: 54000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "NXP automotive chip bookings recover from inventory glut", source: "Reuters", timestamp: "2026-07-19T07:05:00Z", url: "#" },
      { id: "n2", headline: "NXP expands edge AI processor lineup", source: "EE Times", timestamp: "2026-07-13T09:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 2.65, epsActual: null, revenueEstimate: "3.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 56, negative: 44, mentionVolume: 780 },
      reddit: { positive: 51, negative: 49, mentionVolume: 340 },
      stocktwits: { positive: 59, negative: 41, mentionVolume: 480 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  MCHP: {
    ticker: "MCHP",
    name: "Microchip Technology Incorporated",
    nameKo: "마이크로칩 테크놀로지",
    price: 68.9,
    changePercent: -0.85,
    changeAmount: -0.59,
    volume: 4120000,
    marketCap: 38000000000,
    sector: "반도체",
    news: [
      { id: "n1", headline: "Microchip industrial demand shows early recovery signs", source: "Reuters", timestamp: "2026-07-18T15:40:00Z", url: "#" },
      { id: "n2", headline: "Microchip closes fab consolidation program", source: "EE Times", timestamp: "2026-07-11T08:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: 0.32, epsActual: null, revenueEstimate: "1.05B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 48, negative: 52, mentionVolume: 480 },
      reddit: { positive: 44, negative: 56, mentionVolume: 220 },
      stocktwits: { positive: 51, negative: 49, mentionVolume: 310 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "배당 유지와 부채 상환 병행 과정에서 자본 조달 여지 일부 존재." }
    }
  },
  LI: {
    ticker: "LI",
    name: "Li Auto Inc.",
    nameKo: "리오토",
    price: 24.6,
    changePercent: 2.1,
    changeAmount: 0.51,
    volume: 8760000,
    marketCap: 24000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Li Auto extended-range EV deliveries beat monthly target", source: "CnEVPost", timestamp: "2026-07-19T04:20:00Z", url: "#" },
      { id: "n2", headline: "Li Auto expands charging network across China", source: "Reuters", timestamp: "2026-07-12T07:50:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-27", reportTime: "BMO", epsEstimate: 0.28, epsActual: null, revenueEstimate: "4.1B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 58, negative: 42, mentionVolume: 1230 },
      reddit: { positive: 52, negative: 48, mentionVolume: 560 },
      stocktwits: { positive: 61, negative: 39, mentionVolume: 780 }
    },
    risk: {
      dilution: { level: "medium", description: "공장 증설 자금 조달을 위한 유상증자 가능성 존재." },
      delisting: { level: "medium", description: "중국 기업 ADR 특성상 미국 회계감독 규정 관련 리스크 상존." },
      shareDilutionRisk: { level: "medium", description: "신주 발행을 통한 자금 조달 이력이 있어 희석 여지 존재." }
    }
  },
  CVNA: {
    ticker: "CVNA",
    name: "Carvana Co.",
    nameKo: "카바나",
    price: 285.3,
    changePercent: -3.2,
    changeAmount: -9.43,
    volume: 3120000,
    marketCap: 62000000000,
    sector: "자동차",
    news: [
      { id: "n1", headline: "Carvana used car unit sales growth decelerates", source: "Reuters", timestamp: "2026-07-18T18:40:00Z", url: "#" },
      { id: "n2", headline: "Carvana expands reconditioning center capacity", source: "Automotive News", timestamp: "2026-07-11T09:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-06", reportTime: "AMC", epsEstimate: 1.45, epsActual: null, revenueEstimate: "4.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 44, negative: 56, mentionVolume: 1560 },
      reddit: { positive: 39, negative: 61, mentionVolume: 680 },
      stocktwits: { positive: 47, negative: 53, mentionVolume: 890 }
    },
    risk: {
      dilution: { level: "medium", description: "확장 자금 조달을 위한 유상증자 가능성 일부 존재." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "과거 대규모 부채·주식 재조정 이력이 있어 희석 여지 존재." }
    }
  },
  C: {
    ticker: "C",
    name: "Citigroup Inc.",
    nameKo: "씨티그룹",
    price: 78.4,
    changePercent: 0.65,
    changeAmount: 0.51,
    volume: 14230000,
    marketCap: 148000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Citigroup trading revenue beats estimates", source: "Reuters", timestamp: "2026-07-19T07:10:00Z", url: "#" },
      { id: "n2", headline: "Citigroup advances multi-year restructuring plan", source: "Bloomberg", timestamp: "2026-07-14T10:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-14", reportTime: "BMO", epsEstimate: 1.85, epsActual: null, revenueEstimate: "20.8B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 54, negative: 46, mentionVolume: 980 },
      reddit: { positive: 49, negative: 51, mentionVolume: 430 },
      stocktwits: { positive: 57, negative: 43, mentionVolume: 610 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형 은행주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  WFC: {
    ticker: "WFC",
    name: "Wells Fargo & Company",
    nameKo: "웰스파고",
    price: 72.8,
    changePercent: 0.45,
    changeAmount: 0.33,
    volume: 16230000,
    marketCap: 245000000000,
    sector: "금융",
    news: [
      { id: "n1", headline: "Wells Fargo asset cap officially lifted by regulators", source: "Reuters", timestamp: "2026-07-19T06:30:00Z", url: "#" },
      { id: "n2", headline: "Wells Fargo expands consumer lending products", source: "CNBC", timestamp: "2026-07-13T09:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-10-14", reportTime: "BMO", epsEstimate: 1.42, epsActual: null, revenueEstimate: "20.5B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 890 },
      reddit: { positive: 50, negative: 50, mentionVolume: 390 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형 은행주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  CI: {
    ticker: "CI",
    name: "The Cigna Group",
    nameKo: "시그나",
    price: 328.6,
    changePercent: -0.95,
    changeAmount: -3.15,
    volume: 1450000,
    marketCap: 92000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Cigna medical cost trend runs slightly above guidance", source: "Reuters", timestamp: "2026-07-18T14:20:00Z", url: "#" },
      { id: "n2", headline: "Cigna expands specialty pharmacy services", source: "Modern Healthcare", timestamp: "2026-07-11T09:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-01", reportTime: "BMO", epsEstimate: 7.25, epsActual: null, revenueEstimate: "62.4B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 49, negative: 51, mentionVolume: 460 },
      reddit: { positive: 44, negative: 56, mentionVolume: 210 },
      stocktwits: { positive: 52, negative: 48, mentionVolume: 290 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  ISRG: {
    ticker: "ISRG",
    name: "Intuitive Surgical, Inc.",
    nameKo: "인튜이티브 서지컬",
    price: 512.4,
    changePercent: 1.15,
    changeAmount: 5.83,
    volume: 1230000,
    marketCap: 185000000000,
    sector: "헬스케어",
    news: [
      { id: "n1", headline: "Intuitive Surgical da Vinci procedure volumes grow steadily", source: "Reuters", timestamp: "2026-07-19T06:50:00Z", url: "#" },
      { id: "n2", headline: "Intuitive Surgical launches next-gen surgical robot", source: "MedTech Dive", timestamp: "2026-07-13T09:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-22", reportTime: "AMC", epsEstimate: 1.95, epsActual: null, revenueEstimate: "2.3B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 65, negative: 35, mentionVolume: 610 },
      reddit: { positive: 60, negative: 40, mentionVolume: 260 },
      stocktwits: { positive: 68, negative: 32, mentionVolume: 380 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  SKX: {
    ticker: "SKX",
    name: "Skechers U.S.A., Inc.",
    nameKo: "스케쳐스",
    price: 62.3,
    changePercent: -1.4,
    changeAmount: -0.88,
    volume: 1670000,
    marketCap: 9500000000,
    sector: "스포츠/의류",
    news: [
      { id: "n1", headline: "Skechers international sales offset domestic softness", source: "Reuters", timestamp: "2026-07-18T15:00:00Z", url: "#" },
      { id: "n2", headline: "Skechers expands comfort technology footwear line", source: "Footwear News", timestamp: "2026-07-10T09:30:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-24", reportTime: "AMC", epsEstimate: 0.92, epsActual: null, revenueEstimate: "2.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 50, negative: 50, mentionVolume: 390 },
      reddit: { positive: 45, negative: 55, mentionVolume: 180 },
      stocktwits: { positive: 53, negative: 47, mentionVolume: 260 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  SNOW: {
    ticker: "SNOW",
    name: "Snowflake Inc.",
    nameKo: "스노우플레이크",
    price: 178.6,
    changePercent: 2.85,
    changeAmount: 4.95,
    volume: 6120000,
    marketCap: 58000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Snowflake AI data cloud bookings accelerate", source: "TechCrunch", timestamp: "2026-07-19T07:20:00Z", url: "#" },
      { id: "n2", headline: "Snowflake expands partnership with major cloud providers", source: "Reuters", timestamp: "2026-07-14T10:00:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-27", reportTime: "AMC", epsEstimate: 0.22, epsActual: null, revenueEstimate: "1.05B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 68, negative: 32, mentionVolume: 1670 },
      reddit: { positive: 62, negative: 38, mentionVolume: 720 },
      stocktwits: { positive: 71, negative: 29, mentionVolume: 980 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "스톡옵션 기반 보상 비중이 높아 지속적 희석 가능성 있음." }
    }
  },
  WDAY: {
    ticker: "WDAY",
    name: "Workday, Inc.",
    nameKo: "워크데이",
    price: 258.4,
    changePercent: 0.55,
    changeAmount: 1.41,
    volume: 1980000,
    marketCap: 68000000000,
    sector: "기술",
    news: [
      { id: "n1", headline: "Workday AI-driven HR tools gain enterprise traction", source: "Reuters", timestamp: "2026-07-19T06:35:00Z", url: "#" },
      { id: "n2", headline: "Workday raises full-year subscription revenue guidance", source: "CNBC", timestamp: "2026-07-13T10:20:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-21", reportTime: "AMC", epsEstimate: 1.85, epsActual: null, revenueEstimate: "2.15B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 59, negative: 41, mentionVolume: 610 },
      reddit: { positive: 54, negative: 46, mentionVolume: 270 },
      stocktwits: { positive: 62, negative: 38, mentionVolume: 380 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "medium", description: "스톡옵션 기반 보상 비중이 있어 지속적 소폭 희석 가능성 있음." }
    }
  },
  PSX: {
    ticker: "PSX",
    name: "Phillips 66",
    nameKo: "필립스66",
    price: 128.9,
    changePercent: 0.75,
    changeAmount: 0.96,
    volume: 2340000,
    marketCap: 52000000000,
    sector: "에너지",
    news: [
      { id: "n1", headline: "Phillips 66 refining margins improve on strong demand", source: "Reuters", timestamp: "2026-07-19T05:30:00Z", url: "#" },
      { id: "n2", headline: "Phillips 66 completes midstream asset expansion", source: "Hart Energy", timestamp: "2026-07-11T08:15:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-25", reportTime: "BMO", epsEstimate: 2.15, epsActual: null, revenueEstimate: "34.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 51, negative: 49, mentionVolume: 480 },
      reddit: { positive: 46, negative: 54, mentionVolume: 220 },
      stocktwits: { positive: 54, negative: 46, mentionVolume: 310 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  SPOT: {
    ticker: "SPOT",
    name: "Spotify Technology S.A.",
    nameKo: "스포티파이",
    price: 412.6,
    changePercent: 1.95,
    changeAmount: 7.89,
    volume: 1670000,
    marketCap: 82000000000,
    sector: "미디어/엔터",
    news: [
      { id: "n1", headline: "Spotify premium subscriber growth beats estimates", source: "Reuters", timestamp: "2026-07-19T06:45:00Z", url: "#" },
      { id: "n2", headline: "Spotify expands audiobook and podcast ad offerings", source: "Variety", timestamp: "2026-07-13T10:10:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-29", reportTime: "BMO", epsEstimate: 2.35, epsActual: null, revenueEstimate: "4.6B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 66, negative: 34, mentionVolume: 2340 },
      reddit: { positive: 60, negative: 40, mentionVolume: 1010 },
      stocktwits: { positive: 69, negative: 31, mentionVolume: 1340 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  },
  CMG: {
    ticker: "CMG",
    name: "Chipotle Mexican Grill, Inc.",
    nameKo: "치폴레",
    price: 58.4,
    changePercent: -0.65,
    changeAmount: -0.38,
    volume: 8120000,
    marketCap: 78000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Chipotle same-store sales growth moderates", source: "Reuters", timestamp: "2026-07-19T06:05:00Z", url: "#" },
      { id: "n2", headline: "Chipotle accelerates new restaurant openings", source: "CNBC", timestamp: "2026-07-12T09:45:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-07-23", reportTime: "AMC", epsEstimate: 0.32, epsActual: null, revenueEstimate: "3.2B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 57, negative: 43, mentionVolume: 890 },
      reddit: { positive: 52, negative: 48, mentionVolume: 390 },
      stocktwits: { positive: 60, negative: 40, mentionVolume: 560 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "자사주 매입 지속으로 희석 위험 낮음." }
    }
  },
  YUM: {
    ticker: "YUM",
    name: "Yum! Brands, Inc.",
    nameKo: "얌브랜즈",
    price: 138.9,
    changePercent: 0.35,
    changeAmount: 0.48,
    volume: 1670000,
    marketCap: 40000000000,
    sector: "소비재",
    news: [
      { id: "n1", headline: "Yum Brands KFC international growth stays strong", source: "Reuters", timestamp: "2026-07-19T05:40:00Z", url: "#" },
      { id: "n2", headline: "Yum Brands expands digital ordering platform", source: "Restaurant Business", timestamp: "2026-07-10T08:40:00Z", url: "#" }
    ],
    earnings: { reportDate: "2026-08-05", reportTime: "BMO", epsEstimate: 1.45, epsActual: null, revenueEstimate: "1.9B", revenueActual: null, surprisePercent: null },
    sentiment: {
      x: { positive: 55, negative: 45, mentionVolume: 460 },
      reddit: { positive: 50, negative: 50, mentionVolume: 210 },
      stocktwits: { positive: 58, negative: 42, mentionVolume: 290 }
    },
    risk: {
      dilution: { level: "low", description: "최근 유상증자 이력 없음." },
      delisting: { level: "low", description: "상장폐지 관련 특이사항 없음." },
      shareDilutionRisk: { level: "low", description: "대형주로 신주 발행을 통한 희석 위험 낮음." }
    }
  }
};

function pickFields(ticker) {
  const s = MOCK_STOCKS_BY_TICKER[ticker];
  return {
    ticker: s.ticker,
    name: s.name,
    nameKo: s.nameKo,
    price: s.price,
    changePercent: s.changePercent,
    changeAmount: s.changeAmount,
    volume: s.volume,
    marketCap: s.marketCap,
    sector: s.sector
  };
}

const MOCK_WATCHLIST = [
  "TSLA", "NVDA", "PLTR", "COIN", "SOFI", "MARA", "RIVN", "MSTR", "AAPL", "AMD", "GME", "INTC", "NIO",
  "SMCI", "LCID", "BYND", "MSFT", "GOOGL", "AMZN", "META", "NFLX", "AVGO", "JPM", "NKE", "JNJ", "XOM",
  "QCOM", "TXN", "F", "GM", "BAC", "V", "PFE", "UNH", "LULU", "ORCL", "CRM", "CVX", "DIS", "WMT", "COST",
  "MU", "TSM", "TM", "STLA", "MA", "GS", "LLY", "MRK", "UAA", "IBM", "CSCO", "COP", "CMCSA", "TGT", "KO",
  "ARM", "ON", "MRVL", "HMC", "AXP", "SCHW", "ABBV", "CVS", "DECK", "NOW", "ADBE", "EOG", "WBD", "SBUX", "MCD",
  "LRCX", "KLAC", "AMAT", "APTV", "PYPL", "BLK", "BMY", "GILD", "RL", "INTU", "PANW", "UBER", "OXY", "LYV", "PEP",
  "NXPI", "MCHP", "LI", "CVNA", "C", "WFC", "CI", "ISRG", "SKX", "SNOW", "WDAY", "PSX", "SPOT", "CMG", "YUM"
].map(pickFields);
const MOCK_GAINERS = ["PLTR", "COIN", "TSLA", "AMD", "NVDA", "MARA", "MSTR", "RIVN"].map(pickFields);
const MOCK_LOSERS = ["SMCI", "GME", "NIO", "AAPL", "LCID", "BYND"].map(pickFields);
