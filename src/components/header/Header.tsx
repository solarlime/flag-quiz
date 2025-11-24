import styled from 'styled-components';
import { Moon, Sun } from '@phosphor-icons/react';
import { observer } from 'mobx-react-lite';
import Title from './Title.tsx';
import Switch from './Switch.tsx';
import { useStore } from '../../store/StoreProvider.tsx';

const StyledHeader = styled.header`
  position: sticky;
  position: -webkit-sticky; /* For Safari */
  top: 0;
  z-index: 5;
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

const Icon = styled.span`
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.grass12};
  width: calc(var(--font-size-normal) + var(--border-width) * 2);
  height: calc(var(--font-size-normal) + var(--border-width) * 2);
  padding: calc(var(--font-size-normal) * 0.2)
    calc(var(--font-size-normal) * 0.1) calc(var(--font-size-normal) * 0.2)
    calc(var(--font-size-normal) * 0.3);
  box-sizing: border-box;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Header = observer(() => {
  const { themeStore } = useStore();

  return (
    <StyledHeader>
      <HeaderContainer>
        <Title />
        <HeaderButtons>
          <Switch testId="theme-switcher">
            <Icon className="icon">
              {themeStore.theme.name === 'light' ? (
                <Sun weight="fill" />
              ) : (
                <Moon weight="fill" />
              )}
            </Icon>
          </Switch>
        </HeaderButtons>
      </HeaderContainer>
    </StyledHeader>
  );
});

export default Header;
