import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { RadioGroup } from 'radix-ui';
import type { TProperties } from '../../../types/save.ts';
import SaveItemContent from './SaveItemContent.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';

const Choice = styled.div`
  display: flex;
  gap: var(--padding-s);
`;

const RadioItem = styled(RadioGroup.Item)<{ $danger?: boolean }>`
  align-self: flex-start;
  flex-shrink: 0;
  width: var(--font-size-bigger);
  height: var(--font-size-bigger);
  border: 0;
  border-radius: var(--padding-s);
  background-color: ${(props) =>
    props.$danger ? props.theme.colors.tomato6 : props.theme.colors.grass6};
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.$danger ? props.theme.colors.tomato7 : props.theme.colors.grass7};
  }

  &:not(:disabled):active {
    background-color: ${(props) =>
      props.$danger ? props.theme.colors.tomato8 : props.theme.colors.grass8};
  }
`;

const RadioIndicator = styled(RadioGroup.Indicator)<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: var(--font-size-normal);
    height: var(--font-size-normal);
    border-radius: var(--radius-xs);
    background-color: ${(props) =>
      props.$danger ? props.theme.colors.tomato12 : props.theme.colors.grass12};
  }
`;

const SaveItem = observer(({ savedState }: { savedState: TProperties }) => {
  const {
    saveStore: { deleteModeEnabled },
  } = useStore();

  return (
    <Choice key={savedState.id}>
      <RadioItem
        value={savedState.id}
        id={savedState.id}
        $danger={deleteModeEnabled}
      >
        <RadioIndicator $danger={deleteModeEnabled} />
      </RadioItem>
      <SaveItemContent savedState={savedState} />
    </Choice>
  );
});

export default SaveItem;
