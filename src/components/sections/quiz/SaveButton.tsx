import { ComponentProps } from 'react';
import CoreButton from '../../generic/CoreButton.tsx';
import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import { useStore } from '../../../store/StoreProvider.tsx';

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
      Saved
    </CoreButton>
  ) : (
    <CoreButton {...props} onClick={handleClick}>
      Save
    </CoreButton>
  );
});

export default SaveButton;
