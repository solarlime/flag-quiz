import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { Properties } from '../interfaces/data.ts';

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

  initQuizStore(savedState?: Properties<QuizStore, 'isCurrentSaved'>) {
    this.quizStore = new QuizStore(savedState);
  }

  get rootStore() {
    return this;
  }
}

export default Store;
