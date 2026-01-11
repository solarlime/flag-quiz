import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Title from './Title.tsx';
import ThemeSwitch from './ThemeSwitch.tsx';

const StyledHeader = styled.header`
  position: -webkit-sticky; /* For old Safari */
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${(props) => props.theme.colors.grass5};
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: var(--padding-l);
  box-sizing: border-box;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;

  & > button:not(:last-child) {
    margin-right: var(--padding-s);
  }
`;

const Header = observer(() => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Title />
        <HeaderButtons>
          <ThemeSwitch testId="theme-switcher" />
        </HeaderButtons>
      </HeaderContainer>
    </StyledHeader>
  );
});

export default Header;
