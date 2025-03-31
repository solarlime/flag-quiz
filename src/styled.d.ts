/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';

import { ITheme } from './interfaces/styled.ts';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
