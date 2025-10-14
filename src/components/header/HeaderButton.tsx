import styled from 'styled-components';
import Button from '../generic/Button.tsx';

const HeaderButton = styled(Button)`
  color: ${(props) => props.theme.colors.color12};
  background-color: ${(props) => props.theme.colors.color2};
  border-color: ${(props) => props.theme.colors.color2};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color3};
    border-color: ${(props) => props.theme.colors.color3};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.color4};
    border-color: ${(props) => props.theme.colors.color4};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.color6};
  }
`;

export default HeaderButton;
