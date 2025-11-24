import styled from 'styled-components';
import Button from './Button.tsx';

export default function createButton(colorPrefix: 'grass' | 'tomato') {
  return styled(Button)`
    color: ${(props) => props.theme.colors[`${colorPrefix}12`]};
    background-color: ${(props) => props.theme.colors[`${colorPrefix}6`]};
    border-color: ${(props) => props.theme.colors[`${colorPrefix}6`]};

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme.colors[`${colorPrefix}7`]};
      border-color: ${(props) => props.theme.colors[`${colorPrefix}7`]};
    }

    &:not(:disabled):active {
      background-color: ${(props) => props.theme.colors[`${colorPrefix}8`]};
      border-color: ${(props) => props.theme.colors[`${colorPrefix}8`]};
    }

    &:disabled {
      color: ${(props) => props.theme.colors[`${colorPrefix}7`]};
    }
  `;
}
