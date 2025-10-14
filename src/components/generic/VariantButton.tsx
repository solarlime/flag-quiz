import styled from 'styled-components';
import Button from './Button.tsx';

const VariantButton = styled(Button)`
  color: ${(props) => props.theme.colors.color10};
  background-color: ${(props) => props.theme.colors.color3};
  border-color: ${(props) => props.theme.colors.color7};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color5};
    border-color: ${(props) => props.theme.colors.color8};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.color6};
    border-color: ${(props) => props.theme.colors.color9};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.color6};
  }
`;

export default VariantButton;
