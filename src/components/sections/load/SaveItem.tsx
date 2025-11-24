import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { RadioGroup } from 'radix-ui';
import type { TProperties } from '../../../types/save.ts';
import SaveItemContent from './SaveItemContent.tsx';

const Choice = styled.div`
  display: flex;
  gap: var(--padding-s);
`;

const RadioItem = styled(RadioGroup.Item)`
  align-self: flex-start;
  flex-shrink: 0;
  width: var(--font-size-bigger);
  height: var(--font-size-bigger);
  border: 0;
  border-radius: var(--padding-s);
  background-color: ${(props) => props.theme.colors.grass6};
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.grass7};
  }

  &:not(:disabled):active {
    background-color: ${(props) => props.theme.colors.grass8};
  }
`;

const RadioIndicator = styled(RadioGroup.Indicator)`
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
    background-color: ${(props) => props.theme.colors.grass12};
  }
`;

const SaveItem = observer(({ savedState }: { savedState: TProperties }) => {
  return (
    <Choice key={savedState.id}>
      <RadioItem value={savedState.id} id={savedState.id}>
        <RadioIndicator />
      </RadioItem>
      <SaveItemContent savedState={savedState} />
    </Choice>
  );
});

export default SaveItem;
