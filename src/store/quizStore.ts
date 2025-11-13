/* eslint-disable mobx/missing-make-observable */
import { v4 as uuidv4 } from 'uuid';
import { observable, action, computed, runInAction } from 'mobx';
import type { TResult, TRawResult, TMistake } from '../types/data.ts';
import type { IQuizForm } from '../types/forms.ts';
import type { TProperties } from '../types/save.ts';

export const shuffleArray = (array: Array<TResult>) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const makeItemGetter = (array: Array<TResult>) => {
  const usedArray = array.slice();
  return () => {
    const index = Math.floor(Math.random() * usedArray.length);
    const item = usedArray[index];
    usedArray.splice(index, 1);
    return item;
  };
};

class QuizStore {
  constructor(arg: TProperties | IQuizForm) {
    if ('answer' in arg) {
      console.log('Restoring saved state');
      const savedState = arg;
      this._data = savedState.data;
      this._score = savedState.score;
      this._mistakes = savedState.mistakes;
      this._fetchStatus = savedState.fetchStatus;
      this._answer = savedState.answer;
      this._variants = savedState.variants;
      this._questionNumber = savedState.questionNumber;
      this._questionsQuantity = savedState.questionsQuantity;
      this._isCurrentSaved = true;
    } else {
      console.log('Starting a new quiz with parameters');
      this._questionsQuantity = (arg as IQuizForm).questionsQuantity;
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

  private _data: Array<TResult> = [];

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
      const result: TRawResult[] = await Promise.any([
        fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,flag,continents,independent',
          { signal: abortController.signal },
        )
          .then((response) => response.json())
          .then((result) => {
            if (timeout) clearTimeout(timeout);
            console.info('Successfully loaded countries');
            return result;
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
            continents: rawItem.continents,
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

  @observable private accessor _answer: TResult | null = null;

  @computed get answer() {
    return this._answer;
  }

  @observable private accessor _variants: Array<TResult> = [];

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

  @observable private accessor _mistakes: Array<TMistake> = [];

  @computed get mistakes() {
    return this._mistakes;
  }

  @action addAMistake(mistake: TMistake) {
    this._mistakes.push(mistake);
  }

  private _questionsQuantity: number = 10;

  get questionsQuantity() {
    return this._questionsQuantity;
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
    const date = new Date().toISOString();

    const id = uuidv4();
    const quiz: TProperties = {
      data: this.data,
      score: this.score,
      mistakes: this.mistakes,
      fetchStatus: this.fetchStatus,
      answer: this.answer,
      variants: this.variants,
      questionNumber: this.questionNumber,
      questionsQuantity: this.questionsQuantity,
      timestamp: date,
      id,
    };
    localStorage.setItem(`savedState_${id}`, JSON.stringify(quiz));
    this._isCurrentSaved = true;
  }
}

export default QuizStore;
