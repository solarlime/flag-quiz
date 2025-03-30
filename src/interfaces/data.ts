export interface Result {
  name: string;
  countryCodeAlpha2: string;
  independent: boolean;
  flagSymbol: string;
  continents: Set<string>;
}

export interface RawResult {
  name: { common: string };
  cca2: string;
  independent: boolean;
  flag: string;
  continents: Array<string>;
}
