import { makeAutoObservable } from 'mobx';
import { grass, grassDark, tomato, tomatoDark } from '@radix-ui/colors';
import type { ITheme } from '../types/styled.ts';
import { type DefaultTheme } from 'styled-components';

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
        ...grass,
        ...tomato,
      },
    },
    dark: {
      name: 'dark',
      colors: {
        ...grassDark,
        ...tomatoDark,
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
