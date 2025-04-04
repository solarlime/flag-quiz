import styled from 'styled-components';
import Title from './Title.tsx';
import Switch from './Switch.tsx';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--padding-l);
  background-color: ${(props) => props.theme.colors.color5};
  box-sizing: border-box;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title />
      <Switch />
    </StyledHeader>
  );
};

export default Header;
