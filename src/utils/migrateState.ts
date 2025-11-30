import type {
  RawTProperties,
  RawTSavedState,
  TProperties,
  TSavedState,
} from '../types/save.ts';

export default function migrateState(
  parsedState: RawTSavedState | RawTProperties,
  safeParsedState: TSavedState | TProperties,
  key: string,
): TProperties {
  const rawState =
    'savedState' in parsedState ? parsedState.savedState : parsedState;
  const migratedState =
    'savedState' in safeParsedState
      ? safeParsedState.savedState
      : safeParsedState;
  const optionalKeys = ['id', 'timestamp', 'questionsQuantity'] as const;
  const areAllOptionalKeysPresent = optionalKeys.every(
    (key) => rawState[key] === migratedState[key],
  );
  if (!areAllOptionalKeysPresent) {
    localStorage.setItem(
      `savedState_${migratedState.id}`,
      JSON.stringify(migratedState),
    );
    localStorage.removeItem(key);
  }
  return migratedState;
}
