import { promisify } from "util";
import * as express from "express";
import { readFile, read } from "fs";
import { join } from "path";

import { SampleT } from "../../../types";
import { xml2currenciesList } from "./util";

const readFileP = promisify<string, Buffer>(readFile);

function readDataFile(fileName: string): Promise<SampleT[]> {
  return readFileP(join(__dirname, fileName)).then(l =>
    xml2currenciesList(l.toString())
  );
}

var router = express.Router();

router.get("/rate/current", (req, res) =>
  readDataFile("fixtures/eurofxref-hist.xml").then(list => {
    res.json(list[0]);
  })
);

router.get("/rate/history", (req, res) =>
  readDataFile("fixtures/eurofxref-hist-90d.xml").then(list => {
    res.json(list);
  })
);

router.get("/store", (req, res) =>
  Promise.all([
    readDataFile("fixtures/eurofxref-hist.xml"),
    readDataFile("fixtures/eurofxref-hist-90d.xml"),
  ]).then(([current, history]) => {
    res.json({
        current:current[0],
        history, 
    });
  })
);

export default router;
