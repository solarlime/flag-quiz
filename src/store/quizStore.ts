import { observable, action, computed, runInAction } from 'mobx';

export const shuffleArray = (array: Array<any>) => {
  console.log('shuffle');
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

  data: Array<[string, string]> | null = null;

  @action async fetchCountries() {
    try {
      const res = await fetch('https://flagcdn.com/en/codes.json');
      const result: { [key: string]: string } = await res.json();
      runInAction(() => {
        this.data = shuffleArray(Object.entries(result));
        this._fetchStatus = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this._fetchStatus = 'error';
        console.log(e);
      });
    }
  }
}

export default QuizStore;
