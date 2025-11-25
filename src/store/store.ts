import ThemeStore from './themeStore.ts';
import SaveStore from './saveStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { IQuizForm, ILoadForm } from '../types/forms.ts';
import { type TProperties } from '../types/save.ts';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  saveStore = new SaveStore();
  quizStore: QuizStore | undefined;

  initQuizStore(arg: TProperties | IQuizForm | ILoadForm) {
    if ('savedQuizId' in arg && arg.savedQuizId) {
      this.quizStore = new QuizStore(
        this.saveStore.savedStates.find(
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
