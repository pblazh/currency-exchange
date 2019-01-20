const BASE_URL = process.env.REACT_APP_API_URL || "/api";

export default {
  account: `${BASE_URL}/account`,
  exchange: `${BASE_URL}/rate/exchange`,
  history: `${BASE_URL}/rate/history`,
  store: `${BASE_URL}/store`,
};
