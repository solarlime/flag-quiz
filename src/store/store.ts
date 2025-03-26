import ThemeStore from './themeStore.ts';
import QuizStore from './quizStore.ts';

class Store {
  themeStore = new ThemeStore();
  quizStore = new QuizStore();
}

export default Store;
