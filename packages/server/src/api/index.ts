import * as express from "express";
import "isomorphic-fetch";
import { join } from "path";

import { exchange } from "revolute-common";
import { getAccounts, getData, saveAccounts, transfer } from "./util";

const getCurrent = () => getData(
    "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
    join(__dirname, "fixtures/current.xml"),
  );

const getHistory = () => getData(
    "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml",
    join(__dirname, "fixtures/history.xml"),
  );

const router = express.Router();

router.get("/rate/exchange", (req, res) => getCurrent().then(data => res.json(data[0])));
router.get("/rate/history", (req, res) => getHistory().then(data => res.json(data)));

router.get("/store", (req, res) =>
  Promise.all([
    getCurrent(),
    getHistory(),
  ]).then(([current, history]) => {
    res.json({
      current: current[0],
      history,
    });
  }),
);

router.get("/account", (req, res) => getAccounts().then(accounts => res.json(accounts)));

router.post("/transfer", (req, res) => {
  const { from, to, amount } = req.body;
  Promise.all([getAccounts(), getCurrent()])
    .then(([accounts, rates]) => {
      const withdrawn = { currency: from, amount };
      const exchanged = exchange(withdrawn, to, rates[0]);
      if (exchanged instanceof Error) {
        return res.json(accounts);
      } else {
        const updatedAccounts = transfer(withdrawn, exchanged, accounts);
        return saveAccounts(updatedAccounts)
          .then(res.json.bind(res));
      }
    });
});

export default router;
