/* eslint-disable mobx/missing-make-observable */
import { observable, action, computed, runInAction } from 'mobx';
import type { Result, RawResult, Mistake } from '../interfaces/data.ts';

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
  @observable private accessor _fetchStatus: 'loading' | 'done' | 'error' =
    'loading';

  @computed get fetchStatus() {
    return this._fetchStatus;
  }

  private _data: Array<Result> | null = null;

  @action async fetchCountries() {
    try {
      const abortController = new AbortController();
      const result: RawResult[] = await Promise.any([
        fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,flag,continents,independent',
          { signal: abortController.signal },
        ).then((response) => {
          console.info('Successfully loaded countries');
          return response.json();
        }),
        new Promise((resolve) => {
          setTimeout(
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
}

export default QuizStore;
