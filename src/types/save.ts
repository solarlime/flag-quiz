import {
  array,
  number,
  object,
  string,
  literal,
  union,
  null_,
  fallback,
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
  timestamp: fallback(string(), 'some time ago'),
  id: optional(string()),
});

export const TPropertiesSchema = pipe(
  RawTPropertiesSchema,
  transform((data) => ({
    ...data,
    questionsQuantity: data.questionsQuantity ?? data.maxQuestions ?? 10,
    id: data.id ?? uuidv4(),
  })),
);

export type TProperties = InferOutput<typeof TPropertiesSchema>;

// Previously saved games used { savedState: { answer, score, ... } } instead of { answer, score, ... }
export const TSavedStateSchema = object({
  savedState: TPropertiesSchema,
});

export type TSavedState = InferOutput<typeof TSavedStateSchema>;
