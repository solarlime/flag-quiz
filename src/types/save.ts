import {
  array,
  number,
  object,
  string,
  literal,
  union,
  null_,
  type InferOutput,
  optional,
  pipe,
  transform,
} from 'valibot';
import { v4 as uuidv4 } from 'uuid';
import { MistakeSchema, ResultSchema } from './data.ts';

const RawTPropertiesSchema = object({
  data: array(ResultSchema),
  score: number(),
  mistakes: array(MistakeSchema),
  fetchStatus: union([
    literal('done'),
    literal('idle'),
    literal('loading'),
    literal('error'),
  ]),
  answer: union([ResultSchema, null_()]),
  variants: array(ResultSchema),
  questionNumber: number(),
  // Previously saved games used maxQuestions to store questionsQuantity
  questionsQuantity: optional(number()),
  maxQuestions: optional(number()),
  timestamp: optional(string()),
  id: optional(string()),
});

export type RawTProperties = InferOutput<typeof RawTPropertiesSchema>;

export const TPropertiesSchema = pipe(
  RawTPropertiesSchema,
  transform(({ maxQuestions, ...rest }) => ({
    ...rest,
    questionsQuantity: rest.questionsQuantity ?? maxQuestions ?? 10,
    timestamp: rest.timestamp ?? 'some time ago',
    id: rest.id ?? uuidv4(),
  })),
);

export type TProperties = InferOutput<typeof TPropertiesSchema>;

// Previously saved games used { savedState: { answer, score, ... } } instead of { answer, score, ... }
export const TSavedStateSchema = object({
  savedState: TPropertiesSchema,
});

export type TSavedState = InferOutput<typeof TSavedStateSchema>;

const RawTSavedStateSchema = object({
  savedState: RawTPropertiesSchema,
});

export type RawTSavedState = InferOutput<typeof RawTSavedStateSchema>;
