import { observable, action, computed, runInAction } from 'mobx';

export const shuffleArray = (array: Array<any>) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

class QuizStore {
  @observable private accessor _fetchStatus: 'loading' | 'done' | 'error' =
    'loading';

  @computed get fetchStatus() {
    return this._fetchStatus;
  }

  private _data: Array<[string, string]> | null = null;

  @action async fetchCountries() {
    try {
      const res = await fetch('https://flagcdn.com/en/codes.json');
      const result: { [key: string]: string } = await res.json();
      runInAction(() => {
        this._data = shuffleArray(
          Object.entries(result).filter((pair) => !pair[0].includes('us-')),
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

  @observable private accessor _answer: [string, string] | null = null;

  @computed get answer() {
    return this._answer;
  }

  @observable private accessor _variants: Array<string[]> = [];

  @computed get variants() {
    return this._variants;
  }

  @action newQuestion() {
    if (this._data && this._data.length) {
      if (this.answer) {
        this._data.splice(this._data.indexOf(this.answer), 1);
      }
      const variants = [1, 1, 1, 1].map(
        (_item) => this._data![Math.floor(Math.random() * this._data!.length)],
      );
      this._answer = variants[0];
      this._variants = shuffleArray(variants);
    }
  }

  @observable private accessor _score: number = 0;

  @computed get score() {
    return this._score;
  }

  @action increaseScore() {
    this._score += 1;
  }

  @observable private accessor _questionNumber: number = 1;
  private accessor _maxQuestions: number = 10;

  get maxQuestions() {
    return this._maxQuestions;
  }

  @computed get questionNumber() {
    return this._questionNumber;
  }

  @action increaseQuestionNumber() {
    this._questionNumber += 1;
  }
}

export default QuizStore;
