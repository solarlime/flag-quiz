import styled from 'styled-components';
import Title from './Title.tsx';
import Switch from './Switch.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import { Moon, Sun } from '@phosphor-icons/react';
import { observer } from 'mobx-react-lite';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--padding-l);
  background-color: ${(props) => props.theme.colors.color5};
  box-sizing: border-box;
`;

const Icon = styled.span`
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.color12};
  width: calc(var(--font-size) + var(--border-width) * 2);
  height: calc(var(--font-size) + var(--border-width) * 2);
  padding: calc(var(--font-size) * 0.2) calc(var(--font-size) * 0.1)
    calc(var(--font-size) * 0.2) calc(var(--font-size) * 0.3);
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
      <Title />
      <Switch testId="theme-switcher">
        <Icon className="icon">
          {themeStore.theme.name === 'light' ? (
            <Sun weight="fill" />
          ) : (
            <Moon weight="fill" />
          )}
        </Icon>
      </Switch>
    </StyledHeader>
  );
});

export default Header;
