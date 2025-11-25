import { type ComponentProps } from 'react';
import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import CoreButton from '../../generic/CoreButton.tsx';
import TextNode from '../../generic/TextNode.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';

const SaveButton = observer((props: ComponentProps<typeof CoreButton>) => {
  const { quizStore, rootStore } = useStore();

  const handleClick = () => {
    if (quizStore) {
      quizStore.saveQuiz();
      rootStore.updateNeeded = true;
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
