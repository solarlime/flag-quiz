declare module '*.svg';
declare module '*.svg?react';

interface ImportMetaEnv {
  readonly MIN_QUESTIONS: string;
  readonly MAX_QUESTIONS: string;
  readonly FLAGS_FALLBACK: string;
  readonly MAX_SAVED_STATES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
