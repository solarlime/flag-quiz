import styled from 'styled-components';
import Button from '../generic/Button.tsx';

const HeaderButton = styled(Button)`
  display: flex;
  background-color: ${(props) => props.theme.colors.color2};
  border-color: ${(props) => props.theme.colors.color2};

  & > svg {
    margin-right: var(--padding-s);
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color3};
    border-color: ${(props) => props.theme.colors.color3};
  }
`;

export default HeaderButton;
