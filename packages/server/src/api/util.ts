import { promisify } from "util";
import { parseString } from "xml2js";
//import { CurrencyT, SampleT } from "revolute-types";
import { CurrencyT, SampleT } from "../../../types";

interface ParsedSampleEntryT {
  $: {
    currency: string;
    rate: string;
  };
}

interface ParsedSampleT {
  $: {
    time: string;
  };
  Cube?: ParsedSampleEntryT[];
}

interface ParsedHistorySampleT {
  "gesmes:Envelope": {
    Cube: { Cube: ParsedSampleT[] }[];
  };
}

const parseHistorySample = promisify<string, ParsedHistorySampleT>(parseString);

export const convertDate = (dateString: string): Date => {
  const params: number[] = dateString.split("-").map(Number);
  return new Date(params[0], params[1] - 1, params[2]);
};

const itemToCurrency = (item: ParsedSampleEntryT): CurrencyT => ({
  currency: item.$.currency,
  rate: parseFloat(item.$.rate)
});

const sampleToCurrency = (item: ParsedSampleT): SampleT => ({
  updated: convertDate(item.$.time).getTime(),
  currencies: item.Cube ? item.Cube.map(itemToCurrency) : []
});

export const xml2currenciesList = (xml: string): Promise<SampleT[]> =>
  parseHistorySample(xml).then((parsedXml: ParsedHistorySampleT) => {
    const samplesList = parsedXml["gesmes:Envelope"].Cube[0].Cube || [];
    return samplesList ? samplesList.map(sampleToCurrency) : [];
  });
