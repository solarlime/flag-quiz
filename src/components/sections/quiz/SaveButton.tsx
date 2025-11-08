import styled from 'styled-components';
import { type ComponentProps } from 'react';
import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import CoreButton from '../../generic/CoreButton.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';

const TextNode = styled.span`
  line-height: 1;
`;

const SaveButton = observer((props: ComponentProps<typeof CoreButton>) => {
  const { quizStore } = useStore();

  const handleClick = () => {
    if (quizStore) {
      quizStore.saveQuiz();
    }
  };

  return quizStore?.isCurrentSaved ? (
    <CoreButton {...props} disabled>
      <Check weight="regular" />
      <TextNode>Saved</TextNode>
    </CoreButton>
  ) : (
    <CoreButton {...props} onClick={handleClick}>
      Save
    </CoreButton>
  );
});

export default SaveButton;
