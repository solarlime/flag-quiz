import { makeAutoObservable } from 'mobx';
import {
  grass as lightPalette,
  grassDark as darkPalette,
} from '@radix-ui/colors';
import { ITheme } from '../interfaces/styled.ts';
import { DefaultTheme } from 'styled-components';

const toUncolored = (palette: { [key: string]: string }) =>
  Object.fromEntries(
    Object.entries(palette).map(([key, value]) => [
      key.replace(/[a-zA-Z]+/g, 'color'),
      value,
    ]),
  );

class ThemeStore {
  constructor() {
    makeAutoObservable(this);
  }

  private _themes: { [key in 'light' | 'dark']: ITheme } = {
    light: {
      name: 'light',
      colors: {
        ...toUncolored(lightPalette),
      },
    },
    dark: {
      name: 'dark',
      colors: {
        ...toUncolored(darkPalette),
      },
    },
  };

  private _theme: DefaultTheme = this._themes.light;

  get theme() {
    return this._theme;
  }

  toggleTheme() {
    this._theme =
      this._theme.name === 'light' ? this._themes.dark : this._themes.light;
  }
}

export default ThemeStore;
