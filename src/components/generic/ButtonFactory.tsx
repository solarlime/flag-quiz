import styled, { css } from 'styled-components';
import Button from './Button.tsx';

const NotFilled = css<{ $colorPrefix: 'grass' | 'tomato' }>`
  color: ${(props) => props.theme.colors[`${props.$colorPrefix}10`]};
  background-color: ${(props) => props.theme.colors[`${props.$colorPrefix}3`]};
  border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}7`]};

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.theme.colors[`${props.$colorPrefix}5`]};
    border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}8`]};
  }

  &:not(:disabled):active {
    background-color: ${(props) =>
      props.theme.colors[`${props.$colorPrefix}6`]};
    border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}9`]};
  }

  &:disabled {
    color: ${(props) => props.theme.colors[`${props.$colorPrefix}6`]};
  }
`;

const Filled = css<{ $colorPrefix: 'grass' | 'tomato' }>`
  color: ${(props) => props.theme.colors[`${props.$colorPrefix}12`]};
  background-color: ${(props) => props.theme.colors[`${props.$colorPrefix}6`]};
  border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}6`]};

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.theme.colors[`${props.$colorPrefix}7`]};
    border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}7`]};
  }

  &:not(:disabled):active {
    background-color: ${(props) =>
      props.theme.colors[`${props.$colorPrefix}8`]};
    border-color: ${(props) => props.theme.colors[`${props.$colorPrefix}8`]};
  }

  &:disabled {
    color: ${(props) => props.theme.colors[`${props.$colorPrefix}7`]};
  }
`;

const ButtonFactory = styled(Button)<{
  $colorPrefix: 'grass' | 'tomato';
  $filled: boolean;
}>`
  ${(props) => (props.$filled ? Filled : NotFilled)};
`;

export default ButtonFactory;
