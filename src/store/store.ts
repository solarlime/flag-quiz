import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';
import type { Properties } from '../interfaces/data.ts';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  quizStore: QuizStore | undefined;

  initQuizStore(savedState?: Properties<QuizStore>) {
    this.quizStore = new QuizStore(savedState);
  }

  get rootStore() {
    return this;
  }
}

export default Store;
