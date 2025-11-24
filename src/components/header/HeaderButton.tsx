import styled from 'styled-components';
import Button from '../generic/Button.tsx';

const HeaderButton = styled(Button)`
  color: ${(props) => props.theme.colors.grass12};
  background-color: ${(props) => props.theme.colors.grass2};
  border-color: ${(props) => props.theme.colors.grass2};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.grass3};
    border-color: ${(props) => props.theme.colors.grass3};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.grass4};
    border-color: ${(props) => props.theme.colors.grass4};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.grass6};
  }
`;

export default HeaderButton;
