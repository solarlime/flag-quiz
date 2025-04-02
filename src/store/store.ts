import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';
import { makeAutoObservable } from 'mobx';

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  themeStore = new ThemeStore();
  quizStore: QuizStore | undefined;

  initQuizStore() {
    this.quizStore = new QuizStore();
  }

  get rootStore() {
    return this;
  }
}

export default Store;
