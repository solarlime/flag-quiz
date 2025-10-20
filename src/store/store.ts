import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { TSavedState } from '../interfaces/data.ts';
import type { TParameters } from '../interfaces/quizForm.ts';

type SavedState =
  | {
      isDefined: true;
      data: string;
    }
  | {
      isDefined: false;
      data: string | null;
    };

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  quizStore: QuizStore | undefined;

  get savedState(): SavedState {
    const savedState = localStorage.getItem('savedState');
    if (savedState && savedState.length) {
      return {
        isDefined: true,
        data: savedState,
      };
    }
    return {
      isDefined: false,
      data: null,
    };
  }

  initQuizStore(arg: TSavedState<QuizStore, 'isCurrentSaved'> | TParameters) {
    this.quizStore = new QuizStore(arg);
  }

  get rootStore() {
    return this;
  }
}

export default Store;
