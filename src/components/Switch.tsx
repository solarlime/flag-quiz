import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Switch as RadixSwitch } from 'radix-ui';
import { useStore } from '../store/StoreProvider.tsx';

const StyledSwitchRoot = styled(RadixSwitch.Root)`
  width: calc((var(--font-size) + var(--border-width) * 2) * 2);
  background-color: ${(props) => props.theme.colors.color2};
  padding: calc(var(--padding-s));
  border-radius: var(--padding-m);
`;

const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
  width: calc(var(--font-size) + var(--border-width) * 2);
  height: calc(var(--font-size) + var(--border-width) * 2);
  background-color: ${(props) => props.theme.colors.color12};
  border-radius: calc(var(--radius-m) - var(--radius-s));
  transition: transform 100ms;
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(calc(var(--font-size) + var(--border-width) * 2));
  }
`;

const Switch = observer(() => {
  const { themeStore } = useStore();

  return (
    <StyledSwitchRoot
      checked={themeStore.theme.name === 'dark'}
      onCheckedChange={() => themeStore.toggleTheme()}
      value={themeStore.theme.name}
    >
      <StyledSwitchThumb />
    </StyledSwitchRoot>
  );
});

export default Switch;
