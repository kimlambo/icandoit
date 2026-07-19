/* 이 사이트는 백엔드 없이 순수 클라이언트에서 동작하는 구조라 아래 키들은
   GitHub Pages 배포 시 공개 저장소에 그대로 노출된다. 전부 무료 티어 키로,
   유출되어도 금전 피해는 없고 최악의 경우 호출 한도를 남이 써버려 일시적으로
   실시간 데이터가 mock으로 폴백되는 정도다(앱은 계속 정상 동작).
   피해가 반복되면: 각 발급처 대시보드에서 사용량을 확인 후 키를 재발급하고
   여기 값만 교체하면 된다. */

const FINNHUB_API_KEY = "d9e5b49r01qh241ahet0d9e5b49r01qh241ahetg";

/* https://www.alphavantage.co/support/#api-key 에서 발급받은 키를 아래에 붙여넣으세요.
   급상승/급하락 종목 스크리너(TOP_GAINERS_LOSERS)에 사용됩니다. 무료 티어는 하루 25회 제한. */
const ALPHA_VANTAGE_API_KEY = "KXQY0MR4U33NCJ37";

/* https://twelvedata.com/pricing 에서 발급 (무료 티어 하루 800회). 종목 상세의 차트 탭에 사용됩니다. */
const TWELVE_DATA_API_KEY = "18939a75e0b94f7bbbac8b0ffd0805da";
