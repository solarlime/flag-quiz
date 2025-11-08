/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';

import type { ITheme } from './interfaces/styled.ts';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
