import * as express from "express";
import "isomorphic-fetch";
import { join } from "path";

import { exchange } from "revolute-common";
import accounts from "./fixtures/fakeAccounts";
import { getData } from "./util";

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

router.get("/account", (req, res) => res.json(accounts));

router.post("/transfer", (req, res) => {
  const { from, to, amount } = req.body;
  return getCurrent().then(rates => {
    const exchanged = exchange({currency: from, amount}, to, rates[0]);
    if (exchanged instanceof Error ) {
      return res.json(accounts);
    } else {
      const updatedAccounts = accounts.map(account => {
        if (account.currency === from) {
            return { currency: account.currency, amount: account.amount - amount };
        } else if (account.currency === to) {
            return { currency: account.currency, amount: account.amount + exchanged.amount };
        }
        return account;
      });
      return res.json(updatedAccounts);
    }
  });
});

export default router;
