import config from "./config";

const fetchJSON = (url: string) => () =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Network error at ${url}`);
    })
    .catch((err) => {
      // tslint:disable-next-line
      console.error(err);
    });

export const current = fetchJSON(config.current);
export const history = fetchJSON(config.history);
export const store = fetchJSON(config.store);
