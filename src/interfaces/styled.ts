export interface ITheme {
  name: 'light' | 'dark';
  colors: {
    [key: string]: string;
  };
}
