import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Moon, Sun } from '@phosphor-icons/react';
import { useStore } from '../../store/StoreProvider.tsx';
import Switch from '../generic/Switch.tsx';
import SwitchIcon from '../generic/SwitchIcon.tsx';

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
      <SwitchIcon>
        {themeStore.theme.name === 'light' ? (
          <Sun weight="fill" />
        ) : (
          <Moon weight="fill" />
        )}
      </SwitchIcon>
      <span className="visually-hidden">{`${themeStore.theme.name} theme`}</span>
    </StyledSwitchRoot>
  );
});

export default ThemeSwitch;
