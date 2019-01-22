import { existsSync, writeFile } from "fs";
import { readFile } from "fs";
import { ICurrency, ISample } from "revolute-common";
import { promisify } from "util";
import { parseString } from "xml2js";

interface IParsedSampleEntry {
  $: {
    currency: string;
    rate: string;
  };
}

interface IParsedSample {
  $: {
    time: string;
  };
  Cube?: IParsedSampleEntry[];
}

interface IParsedHistorySample {
  "gesmes:Envelope": {
    Cube: Array<{ Cube: IParsedSample[] }>;
  };
}

const parseHistorySample = promisify<string, IParsedHistorySample>(parseString);
const writeToFile = promisify<string, string>(writeFile);

export const convertDate = (dateString: string): Date => {
  const params: number[] = dateString.split("-").map(Number);
  return new Date(params[0], params[1] - 1, params[2]);
};

const itemToCurrency = (item: IParsedSampleEntry): ICurrency => ({
  currency: item.$.currency,
  rate: parseFloat(item.$.rate),
});

const ISampleoCurrency = (item: IParsedSample): ISample => ({
  currencies: item.Cube ? item.Cube.map(itemToCurrency) : [],
  updated: convertDate(item.$.time).getTime(),
});

export const xml2currenciesList = (xml: string): Promise<ISample[]> =>
  parseHistorySample(xml).then((parsedXml: IParsedHistorySample) => {
    const samplesList = parsedXml["gesmes:Envelope"].Cube[0].Cube || [];
    return samplesList ? samplesList.map(ISampleoCurrency) : [];
  });

export const randomize = (rates: ISample[]): ISample[] =>
  rates.map(
    rate => ({
      currencies: rate.currencies.map(
        currency => ({...currency, rate: currency.rate * (0.9 + Math.random() * 0.1)}),
      ),
      updated: rate.updated,
    }),
  );

const fetchAndSave = (url: string, fileName: string) => {

  if (existsSync(fileName)) {
    return Promise.resolve();
  }

  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error(`Network error at ${url}`);
    })
    .then((data: string) =>
      writeToFile(fileName, data),
    );
};

const readFileP = promisify<string, Buffer>(readFile);

function readDataFile(fileName: string): Promise<ISample[]> {
  return readFileP(fileName).then(l =>
    xml2currenciesList(l.toString()),
  );
}

export const getData = (url: string, name: string) =>
  fetchAndSave(url, name)
  .then(() =>
    readDataFile(name)
      .then(randomize),
  );
