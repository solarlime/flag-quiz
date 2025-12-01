import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Lock, LockOpen } from '@phosphor-icons/react';
import { useStore } from '../../../store/StoreProvider.tsx';
import Switch from '../../generic/Switch.tsx';
import SwitchIcon from '../../generic/SwitchIcon.tsx';

const StyledSwitchRoot = styled(Switch.Root)<{ $danger?: boolean }>`
  background-color: ${(props) =>
    props.$danger ? props.theme.colors.tomato6 : props.theme.colors.grass6};

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.$danger ? props.theme.colors.tomato7 : props.theme.colors.grass7};
  }

  &:not(:disabled):active {
    background-color: ${(props) =>
      props.$danger ? props.theme.colors.tomato8 : props.theme.colors.grass8};
  }
`;

const StyledSwitchThumb = styled(Switch.Thumb)<{ $danger?: boolean }>`
  background-color: ${(props) =>
    props.$danger ? props.theme.colors.tomato12 : props.theme.colors.grass12};
`;

const DeleteModeSwitch = observer(({ testId }: { testId?: string }) => {
  const { saveStore } = useStore();

  return (
    <StyledSwitchRoot
      checked={saveStore.deleteModeEnabled}
      onCheckedChange={() => saveStore.toggleDeleteModeEnabled()}
      value={saveStore.deleteModeEnabled.toString()}
      data-value={saveStore.deleteModeEnabled.toString()}
      data-testid={testId}
      $danger={saveStore.deleteModeEnabled}
    >
      <StyledSwitchThumb $danger={saveStore.deleteModeEnabled} />
      <SwitchIcon $danger={saveStore.deleteModeEnabled}>
        {!saveStore.deleteModeEnabled ? (
          <Lock weight="fill" />
        ) : (
          <LockOpen weight="fill" />
        )}
      </SwitchIcon>
    </StyledSwitchRoot>
  );
});

export default DeleteModeSwitch;
