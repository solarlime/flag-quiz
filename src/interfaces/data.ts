export interface IResult {
  name: string;
  countryCodeAlpha2: string;
  independent: boolean;
  flagSymbol: string;
  continents: Set<string>;
}

export interface IRawResult {
  name: { common: string };
  cca2: string;
  independent: boolean;
  flag: string;
  continents: Array<string>;
}

export interface IMistake {
  chosen: IResult;
  correct: IResult;
}

export type TProperties<T, O extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof Omit<T, O> as Omit<T, O>[K] extends Function ? never : K]: Omit<
    T,
    O
  >[K];
};

export type TSavedState<T, O extends string> = {
  savedState: TProperties<T, O>;
};
