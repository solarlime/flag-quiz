import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import type { TProperties } from '../../../types/save.ts';

const Label = styled.label`
  padding: calc(var(--font-size-normal) - var(--font-size-small)) 0;
  line-height: 1;
  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: var(--padding-s);

  & > span {
    font-size: var(--font-size-small);
  }
`;

const getDate = (dateString: string) => {
  if (dateString === 'some time ago') return dateString;
  return new Date(dateString).toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

const SaveItemContent = observer(
  ({ savedState }: { savedState: TProperties }) => {
    return (
      <div>
        <Label htmlFor={savedState.id}>
          Save from {getDate(savedState.timestamp)}
        </Label>
        <Description>
          <span>Next flag: {savedState.answer?.flagSymbol}</span>
          <span>Score: {savedState.score}</span>
          <span>
            Question number: {savedState.questionNumber}/
            {savedState.questionsQuantity}
          </span>
        </Description>
      </div>
    );
  },
);

export default SaveItemContent;
