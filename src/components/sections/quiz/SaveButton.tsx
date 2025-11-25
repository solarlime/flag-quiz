import { type ComponentProps } from 'react';
import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import CoreButton from '../../generic/CoreButton.tsx';
import TextNode from '../../generic/TextNode.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';

const SaveButton = observer((props: ComponentProps<typeof CoreButton>) => {
  const { quizStore, saveStore } = useStore();

  const handleClick = () => {
    if (quizStore) {
      quizStore.canBeSaved = false;
      quizStore.saveQuiz();
      saveStore.updateNeeded = true;
    }
  };

  if (quizStore) {
    return quizStore.isCurrentSaved ? (
      <CoreButton {...props} disabled={!quizStore.canBeSaved}>
        <Check weight="regular" />
        <TextNode>Saved</TextNode>
      </CoreButton>
    ) : (
      <CoreButton
        {...props}
        onClick={handleClick}
        disabled={!quizStore.canBeSaved}
      >
        Save
      </CoreButton>
    );
  }

  return null;
});

export default SaveButton;
