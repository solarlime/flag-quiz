/* eslint-disable mobx/missing-make-observable */
import { observable, action, computed, runInAction } from 'mobx';
import type {
  Result,
  RawResult,
  Mistake,
  Properties,
} from '../interfaces/data.ts';

export const shuffleArray = (array: Array<Result>) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const makeItemGetter = (array: Array<Result>) => {
  const usedArray = array.slice();
  return () => {
    const index = Math.floor(Math.random() * usedArray.length);
    const item = usedArray[index];
    usedArray.splice(index, 1);
    return item;
  };
};

class QuizStore {
  constructor(savedState?: Properties<QuizStore, 'isCurrentSaved'>) {
    if (savedState) {
      console.log('Restoring saved state');
      this._data = savedState.data;
      this._score = savedState.score;
      this._mistakes = savedState.mistakes;
      this._fetchStatus = savedState.fetchStatus;
      this._answer = savedState.answer;
      this._variants = savedState.variants;
      this._questionNumber = savedState.questionNumber;
      this._maxQuestions = savedState.maxQuestions;
      this._isCurrentSaved = true;
    }
  }

  @observable private accessor _fetchStatus:
    | 'idle'
    | 'loading'
    | 'done'
    | 'error' = 'idle';

  @computed get fetchStatus() {
    return this._fetchStatus;
  }

  private _data: Array<Result> | null = null;

  @computed get data() {
    return this._data;
  }

  @action async fetchCountries() {
    try {
      runInAction(() => {
        this._fetchStatus = 'loading';
      });
      const abortController = new AbortController();
      let timeout: null | NodeJS.Timeout = null;
      const result: RawResult[] = await Promise.any([
        fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,flag,continents,independent',
          { signal: abortController.signal },
        ).then((response) => {
          if (timeout) clearTimeout(timeout);
          console.info('Successfully loaded countries');
          return response.json();
        }),
        new Promise((resolve) => {
          timeout = setTimeout(
            () =>
              import('./fallback_countries.json').then((module) => {
                abortController.abort();
                console.info('Fallback countries loaded');
                resolve(module.default);
              }),
            2000,
          );
        }),
      ]);
      runInAction(() => {
        this._data = shuffleArray(
          result.map((rawItem) => ({
            name: rawItem.name.common,
            countryCodeAlpha2: rawItem.cca2.toLowerCase(),
            independent: rawItem.independent,
            flagSymbol: rawItem.flag,
            continents: new Set(rawItem.continents),
          })),
        );
        this.newQuestion();
        this._fetchStatus = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this._fetchStatus = 'error';
        console.log(e);
      });
    }
  }

  @observable private accessor _answer: Result | null = null;

  @computed get answer() {
    return this._answer;
  }

  @observable private accessor _variants: Array<Result> = [];

  @computed get variants() {
    return this._variants;
  }

  @action newQuestion() {
    if (this._data && this._data.length) {
      if (this.answer) {
        this._data.splice(
          this._data.findIndex(
            (item) => item.countryCodeAlpha2 === this.answer?.countryCodeAlpha2,
          ),
          1,
        );
      }
      const getItem = makeItemGetter(this._data);
      const variants = [1, 1, 1, 1].map((_item) => getItem());
      this._answer = variants[0];
      this._variants = shuffleArray(variants);
      if (this.isCurrentSaved) this._isCurrentSaved = false;
    }
  }

  @action finishQuiz() {
    this._answer = null;
    this._variants = [];
  }

  @observable private accessor _score: number = 0;

  @computed get score() {
    return this._score;
  }

  @action increaseScore() {
    this._score += 1;
  }

  @observable private accessor _mistakes: Array<Mistake> = [];

  @computed get mistakes() {
    return this._mistakes;
  }

  @action addAMistake(mistake: Mistake) {
    this._mistakes.push(mistake);
  }

  private _maxQuestions: number = import.meta.env.VITE_MAX_QUESTIONS
    ? +import.meta.env.VITE_MAX_QUESTIONS
    : 10;

  get maxQuestions() {
    return this._maxQuestions;
  }

  @observable private accessor _questionNumber: number = 1;

  @computed get questionNumber() {
    return this._questionNumber;
  }

  @action increaseQuestionNumber() {
    this._questionNumber += 1;
  }

  @observable private accessor _isCurrentSaved = false;

  @computed get isCurrentSaved() {
    return this._isCurrentSaved;
  }

  @action saveQuiz() {
    const quiz: Properties<QuizStore, 'isCurrentSaved'> = {
      data: this.data,
      score: this.score,
      mistakes: this.mistakes,
      fetchStatus: this.fetchStatus,
      answer: this.answer,
      variants: this.variants,
      questionNumber: this.questionNumber,
      maxQuestions: this.maxQuestions,
    };
    localStorage.setItem('savedState', JSON.stringify(quiz));
    this._isCurrentSaved = true;
  }
}

export default QuizStore;
