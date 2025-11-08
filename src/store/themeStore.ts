import { makeAutoObservable } from 'mobx';
import {
  grass as lightPalette,
  grassDark as darkPalette,
} from '@radix-ui/colors';
import type { ITheme } from '../interfaces/styled.ts';
import { type DefaultTheme } from 'styled-components';

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
    const savedThemeName = localStorage.getItem('themeName') as
      | ITheme['name']
      | null;
    this._theme = savedThemeName
      ? this._themes[savedThemeName]
      : this._themes.light;
  }

  private _themes: { [key in ITheme['name']]: ITheme } = {
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

  private _theme: DefaultTheme;

  get theme() {
    return this._theme;
  }

  toggleTheme() {
    this._theme =
      this._theme.name === 'light' ? this._themes.dark : this._themes.light;
  }
}

export default ThemeStore;
