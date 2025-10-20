import styled from 'styled-components';
import Button from './Button.tsx';

const CoreButton = styled(Button)`
  color: ${(props) => props.theme.colors.color12};
  background-color: ${(props) => props.theme.colors.color5};
  border-color: ${(props) => props.theme.colors.color5};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color7};
    border-color: ${(props) => props.theme.colors.color7};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.color8};
    border-color: ${(props) => props.theme.colors.color8};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.color7};
  }
`;

export default CoreButton;
