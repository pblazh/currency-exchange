import { ISample } from "revolute-common";
import { convertDate, transfer, xml2currenciesList } from "./util";

describe("convertDate", () => {
  it("converts date text into the Date object", () => {
    const expected: string = new Date(2019, 0, 10).toDateString();
    const result: string = convertDate("2019-01-10").toDateString();

    expect(result).toEqual(expected);
  });
});

describe("xml2currenciesList", () => {
  it("converts an xml list of Cubes into the list of currency objects", async () => {
    const xml = `
      <gesmes:Envelope
        xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01"
        xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
       <gesmes:subject>Reference rates</gesmes:subject>
       <gesmes:Sender>
           <gesmes:name>European Central Bank</gesmes:name>
       </gesmes:Sender>
       <Cube>
           <Cube time="2019-01-10">
               <Cube currency="USD" rate="1.1535"/>
               <Cube currency="JPY" rate="124.70"/>
               <Cube currency="BGN" rate="1.9558"/>
           </Cube>
       </Cube>
   </gesmes:Envelope>`;

    const expected: ISample[] = [
      {
        currencies: [
          { currency: "USD", rate: "1.1535" },
          { currency: "JPY", rate: "124.70" },
          { currency: "BGN", rate: "1.9558" },
        ],
        updated: new Date(2019, 0, 10).getTime(),
      },
    ];

    const result = await xml2currenciesList(xml);

    expect(result).toEqual(expected);
  });

  it("converts an empty xml list of Cubes into the empty list of currency objects", async () => {
    const xml = `
     <gesmes:Envelope
      xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01"
      xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
     <gesmes:subject>Reference rates</gesmes:subject>
     <gesmes:Sender>
         <gesmes:name>European Central Bank</gesmes:name>
     </gesmes:Sender>
     <Cube>
         <Cube time="2019-01-10" />
     </Cube>
 </gesmes:Envelope>`;

    const expected: ISample[] = [
      {
        currencies: [],
        updated: new Date(2019, 0, 10).getTime(),
      },
    ];

    const result = await xml2currenciesList(xml);

    expect(result).toEqual(expected);
  });

  it("converts an empty xml sample entry into an empty list", async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gesmes:Envelope
      xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01"
      xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
        <gesmes:subject>Reference rates</gesmes:subject>
        <gesmes:Sender>
            <gesmes:name>European Central Bank</gesmes:name>
        </gesmes:Sender>
        <Cube />
    </gesmes:Envelope>`;

    const result = await xml2currenciesList(xml);

    expect(result).toEqual([]);
  });
});

describe("xml2currenciesListHistory", () => {
  it("converts an empty xml sample entry into an empty list", async () => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <gesmes:Envelope
      xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01"
      xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
        <gesmes:subject>Reference rates</gesmes:subject>
        <gesmes:Sender>
            <gesmes:name>European Central Bank</gesmes:name>
        </gesmes:Sender>
        <Cube>
            <Cube time="2019-01-10">
                <Cube currency="USD" rate="1.1535"/>
                <Cube currency="JPY" rate="124.7"/>
                <Cube currency="BGN" rate="1.9558"/>
            </Cube>
            <Cube time="2019-01-09">
                <Cube currency="USD" rate="1.1455"/>
                <Cube currency="JPY" rate="124.7"/>
                <Cube currency="BGN" rate="1.9558"/>
            </Cube>
        </Cube>
    </gesmes:Envelope>
    `;
    const result = await xml2currenciesList(xml);
    const expected: ISample[] = [
      {
        currencies: [
          { currency: "USD", rate: "1.1535" },
          { currency: "JPY", rate: "124.7" },
          { currency: "BGN", rate: "1.9558" },
        ],
        updated: new Date(2019, 0, 10).getTime(),
      },
      {
        currencies: [
          { currency: "USD", rate: "1.1455" },
          { currency: "JPY", rate: "124.7" },
          { currency: "BGN", rate: "1.9558" },
        ],
        updated: new Date(2019, 0, 9).getTime(),
      },
    ];

    expect(result).toEqual(expected);
  });
});

describe("transfer", () => {
  it("transfers 0", () => {
    const accounts = [
      {
        amount: 30000,
        currency: "EUR",
      },
      {
        amount: 40000,
        currency: "USD",
      },
    ];
    const from = {
      amount: 0,
      currency: "EUR",
    };
    const to = {
      amount: 0,
      currency: "USD",
    };

    const result = transfer(from, to, accounts);

    expect(result).toEqual(accounts);
  });

  it("transfers more than 0", () => {
    const accounts = [
      {
        amount: 30000,
        currency: "EUR",
      },
      {
        amount: 40000,
        currency: "USD",
      },
    ];

    const from = {
      amount: 100,
      currency: "EUR",
    };

    const to = {
      amount: 200,
      currency: "USD",
    };

    const expected = [
      {
        amount: 29900,
        currency: "EUR",
      },
      {
        amount: 40200,
        currency: "USD",
      },
    ];

    const result = transfer(from, to, accounts);

    expect(result).toEqual(expected);
  });

  it("transfers correctly when from and to is the same", () => {
    const accounts = [
      {
        amount: 30000,
        currency: "EUR",
      },
      {
        amount: 40000,
        currency: "USD",
      },
    ];

    const from = {
      amount: 100,
      currency: "EUR",
    };

    const result = transfer(from, from, accounts);

    expect(result).toEqual(accounts);
  });

  it("does not transfer when from is bigger then amount", () => {
    const accounts = [
      {
        amount: 30000,
        currency: "EUR",
      },
      {
        amount: 40000,
        currency: "USD",
      },
    ];

    const from = {
      amount: 40000,
      currency: "EUR",
    };

    const to = {
      amount: 40000,
      currency: "USD",
    };

    const result = transfer(from, to, accounts);

    expect(result).toEqual(accounts);
  });
});
