import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { IQuizForm, ILoadForm } from '../types/forms.ts';
import { safeParse, union } from 'valibot';
import {
  type TProperties,
  TPropertiesSchema,
  TSavedStateSchema,
} from '../types/save.ts';

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

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  quizStore: QuizStore | undefined;

  private _savedStates = new Array<TProperties>();
  private _corruptedStates: Array<string> = [];

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

  loadSavedStates() {
    const savedStateString = localStorage.getItem('savedState')!;
    if (savedStateString) {
      try {
        const parsed = JSON.parse(savedStateString);
        console.log(parsed);
        const safeParsed = safeParse(
          union([TPropertiesSchema, TSavedStateSchema]),
          parsed,
        );
        if (safeParsed.success) {
          const savedState = safeParsed.output;
          if ('savedState' in savedState) {
            this._savedStates.push(savedState.savedState);
          } else {
            this._savedStates.push(savedState);
          }
        } else {
          console.error(safeParsed.issues);
          this._corruptedStates.push('savedState');
        }
      } catch (e) {
        console.error(e);
        this._corruptedStates.push('savedState');
      }
    }
  }

  initQuizStore(arg: TProperties | IQuizForm | ILoadForm) {
    if ('savedQuizId' in arg && arg.savedQuizId) {
      this.quizStore = new QuizStore(
        this._savedStates.find(
          (savedState) => savedState.id === arg.savedQuizId,
        )!,
      );
    } else {
      this.quizStore = new QuizStore(arg as TProperties | IQuizForm);
    }
  }

  get rootStore() {
    return this;
  }
}

export default Store;
