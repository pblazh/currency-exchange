import * as express from "express";
import "isomorphic-fetch";
import { join } from "path";

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

export default router;
