import * as express from "express";
import { read, readFile } from "fs";
import { join } from "path";
import { ISample } from "revolute-common";
import { promisify } from "util";

import accounts from "./fixtures/fakeAccounts";
import { randomize, xml2currenciesList } from "./util";

const readFileP = promisify<string, Buffer>(readFile);

function readDataFile(fileName: string): Promise<ISample[]> {
  return readFileP(join(__dirname, fileName)).then(l =>
    xml2currenciesList(l.toString()),
  );
}

const router = express.Router();

router.get("/rate/exchange", (req, res) =>
  readDataFile("fixtures/eurofxref-hist.xml")
    .then(randomize)
    .then(list => {
      res.json(list[0]);
    }),
);

router.get("/rate/history", (req, res) =>
  readDataFile("fixtures/eurofxref-hist-90d.xml").then(list => {
    res.json(list);
  }),
);

router.get("/store", (req, res) =>
  Promise.all([
    readDataFile("fixtures/eurofxref-hist.xml"),
    readDataFile("fixtures/eurofxref-hist-90d.xml"),
  ]).then(([current, history]) => {
    res.json({
      current: current[0],
      history,
    });
  }),
);

router.get("/account", (req, res) =>
  res.json(
    accounts.map(account => ({
      ...account,
      amount: account.amount * Math.random(),
    })),
  ),
);

export default router;
