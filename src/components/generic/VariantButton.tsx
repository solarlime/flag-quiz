import styled from 'styled-components';
import Button from './Button.tsx';

const VariantButton = styled(Button)`
  color: ${(props) => props.theme.colors.grass10};
  background-color: ${(props) => props.theme.colors.grass3};
  border-color: ${(props) => props.theme.colors.grass7};
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.5s ease-out,
    visibility 0.5s ease-out;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.grass5};
    border-color: ${(props) => props.theme.colors.grass8};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.grass6};
    border-color: ${(props) => props.theme.colors.grass9};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.grass6};
  }
`;

export default VariantButton;
