import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Moon, Sun } from '@phosphor-icons/react';
import { useStore } from '../../store/StoreProvider.tsx';
import Switch from '../generic/Switch.tsx';

const StyledSwitchRoot = styled(Switch.Root)`
  background-color: ${(props) => props.theme.colors.grass2};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.grass3};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.grass4};
  }
`;

const StyledSwitchThumb = styled(Switch.Thumb)`
  background-color: ${(props) => props.theme.colors.grass12};
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

const ThemeSwitch = observer(({ testId }: { testId?: string }) => {
  const { themeStore } = useStore();

  return (
    <StyledSwitchRoot
      checked={themeStore.theme.name === 'dark'}
      onCheckedChange={() => themeStore.toggleTheme()}
      value={themeStore.theme.name}
      data-value={themeStore.theme.name}
      data-testid={testId}
    >
      <StyledSwitchThumb />
      <Icon className="icon">
        {themeStore.theme.name === 'light' ? (
          <Sun weight="fill" />
        ) : (
          <Moon weight="fill" />
        )}
      </Icon>
    </StyledSwitchRoot>
  );
});

export default ThemeSwitch;
