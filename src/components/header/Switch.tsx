import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Switch as RadixSwitch } from 'radix-ui';
import { useStore } from '../../store/StoreProvider.tsx';
import { ReactNode } from 'react';

const StyledSwitchRoot = styled(RadixSwitch.Root)`
  display: flex;
  align-items: center;
  width: calc((var(--font-size-normal) + var(--border-width) * 2) * 2);
  background-color: ${(props) => props.theme.colors.color2};
  padding: calc(var(--padding-s));
  border: 0;
  border-radius: var(--padding-m);
  box-sizing: content-box;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color3};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.color4};
  }

  &[data-state='checked'] span.icon {
    padding: calc(var(--font-size-normal) * 0.2)
      calc(var(--font-size-normal) * 0.3) calc(var(--font-size-normal) * 0.2)
      calc(var(--font-size-normal) * 0.1);
    transform: translateX(
      calc(calc(var(--font-size-normal) + var(--border-width) * 2) * -1)
    );
  }
`;

const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
  flex-shrink: 0;
  width: calc(var(--font-size-normal) + var(--border-width) * 2);
  height: calc(var(--font-size-normal) + var(--border-width) * 2);
  background-color: ${(props) => props.theme.colors.color12};
  border-radius: calc(var(--radius-m) - var(--radius-s));
  transition: transform 100ms;
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(
      calc(var(--font-size-normal) + var(--border-width) * 2)
    );
  }
`;

const Switch = observer(
  ({ testId, children }: { testId?: string; children?: ReactNode }) => {
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
        {children}
      </StyledSwitchRoot>
    );
  },
);

export default Switch;
