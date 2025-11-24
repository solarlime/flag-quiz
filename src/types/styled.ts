const colorGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

type ColorGrade = (typeof colorGrades)[number];
export type Color = 'grass' | 'tomato';

type ColorKey = `${Color}${ColorGrade}`;
type Palette = Record<ColorKey, string>;

export interface ITheme {
  name: 'light' | 'dark';
  colors: Palette;
}
