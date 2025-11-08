import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { IQuizForm } from '../interfaces/forms.ts';
import type { TProperties } from '../interfaces/data.ts';
import CustomError from '../utils/CustomError.ts';

type SavedState =
  | {
      isDefined: true;
      data: TProperties<QuizStore, 'isCurrentSaved'>;
    }
  | {
      isDefined: false;
      data: CustomError | Error;
    };

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  quizStore: QuizStore | undefined;

  get savedState(): SavedState {
    const savedStateString = localStorage.getItem('savedState');
    if (savedStateString && savedStateString.length) {
      try {
        const savedState = JSON.parse(savedStateString);
        return {
          isDefined: true,
          data: savedState,
        };
      } catch (error) {
        console.error(error);
        return {
          isDefined: false,
          data: new Error('The saved quiz is corrupted'),
        };
      }
    }
    return {
      isDefined: false,
      data: new CustomError('No saved quiz found'),
    };
  }

  initQuizStore(arg: TProperties<QuizStore, 'isCurrentSaved'> | IQuizForm) {
    this.quizStore = new QuizStore(arg);
  }

  get rootStore() {
    return this;
  }
}

export default Store;
