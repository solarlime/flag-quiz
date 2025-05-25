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

export interface Mistake {
  chosen: Result;
  correct: Result;
}

export type Properties<T, O extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof Omit<T, O> as Omit<T, O>[K] extends Function ? never : K]: Omit<
    T,
    O
  >[K];
};
