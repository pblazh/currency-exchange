import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import createAppStore from "./store/createStore";
import * as serviceWorker from "./serviceWorker";

const initialStore = {
  accounts: [
    {
      currency: "EUR",
      amount: 100
    },
    {
      currency: "USD",
      amount: 200
    },
    {
      currency: "GBP",
      amount: 300
    }
  ]
}; // get if from SSR
const store = createAppStore(initialStore);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
