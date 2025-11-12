import {
  array,
  boolean,
  fallback,
  type InferOutput,
  object,
  optional,
  string,
} from 'valibot';

export const ResultSchema = object({
  name: string(),
  countryCodeAlpha2: string(),
  independent: optional(boolean()),
  flagSymbol: string(),
  continents: fallback(array(string()), ['some continent']),
});

export type TResult = InferOutput<typeof ResultSchema>;

export const RawResultSchema = object({
  name: object({
    common: string(),
  }),
  cca2: string(),
  flag: string(),
  continents: array(string()),
  independent: boolean(),
});

export type TRawResult = InferOutput<typeof RawResultSchema>;

export const MistakeSchema = object({
  chosen: ResultSchema,
  correct: ResultSchema,
});

export type TMistake = InferOutput<typeof MistakeSchema>;
