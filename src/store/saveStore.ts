import { makeAutoObservable } from 'mobx';
import { safeParse, union } from 'valibot';
import type { ILoadForm } from '../types/forms.ts';
import {
  type RawTProperties,
  type RawTSavedState,
  type TProperties,
  TPropertiesSchema,
  TSavedStateSchema,
} from '../types/save.ts';
import migrateState from '../utils/migrateState.ts';

type SavedStates =
  | {
      areAvailableToLoad: true;
      saved: Array<TProperties>;
      corrupted: Array<string>;
    }
  | {
      areAvailableToLoad: false;
      corrupted?: Array<string>;
    };

class SaveStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _savedStates = new Array<TProperties>();

  get savedStates() {
    return this._savedStates;
  }

  private _deleteModeEnabled = false;

  get deleteModeEnabled(): boolean {
    return this._deleteModeEnabled;
  }

  toggleDeleteModeEnabled(): void {
    this._deleteModeEnabled = !this._deleteModeEnabled;
  }

  private _corruptedStates: Array<string> = [];

  updateNeeded = true;

  get states(): SavedStates {
    if (this._savedStates.length > 0) {
      return {
        areAvailableToLoad: true,
        saved: this._savedStates,
        corrupted: this._corruptedStates,
      };
    }
    if (this._corruptedStates.length > 0) {
      return {
        areAvailableToLoad: false,
        corrupted: this._corruptedStates,
      };
    }
    return {
      areAvailableToLoad: false,
    };
  }

  deleteSavedState(arg: ILoadForm) {
    this._savedStates = this._savedStates.filter(
      (savedState) => savedState.id !== arg.savedQuizId,
    );
    localStorage.removeItem(`savedState_${arg.savedQuizId}`);
  }

  deleteCorruptedStates() {
    this._corruptedStates.forEach((corruptedState) =>
      localStorage.removeItem(corruptedState),
    );
    this._corruptedStates.length = 0;
  }

  private clearSavedStates() {
    this._savedStates.length = 0;
    this._corruptedStates.length = 0;
  }

  loadSavedStates() {
    this.clearSavedStates();
    for (let i = 0; i < localStorage.length; i += 1) {
      const nextItemKey = localStorage.key(i)!;
      if (nextItemKey.startsWith('savedState')) {
        const savedStateString = localStorage.getItem(nextItemKey)!;
        try {
          const parsed: RawTProperties | RawTSavedState =
            JSON.parse(savedStateString);
          const safeParsed = safeParse(
            union([TPropertiesSchema, TSavedStateSchema]),
            parsed,
          );
          if (safeParsed.success) {
            const savedState = migrateState(
              parsed,
              safeParsed.output,
              nextItemKey,
            );
            this._savedStates.push(savedState);
          } else {
            console.error(safeParsed.issues);
            this._corruptedStates.push(nextItemKey);
          }
        } catch (e) {
          console.error(e);
          this._corruptedStates.push(nextItemKey);
        }
      }
    }
    this._savedStates = this._savedStates.sort((a, b) => {
      if (a.timestamp === 'some time ago') return 1;
      if (b.timestamp === 'some time ago') return -1;
      if (a.timestamp < b.timestamp) return 1;
      if (a.timestamp > b.timestamp) return -1;
      return 0;
    });
    this.updateNeeded = false;
  }
}

export default SaveStore;
