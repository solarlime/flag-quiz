import { ComponentProps } from 'react';
import HeaderButton from './HeaderButton.tsx';
import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import { useStore } from '../../store/StoreProvider.tsx';

const SaveButton = observer((props: ComponentProps<typeof HeaderButton>) => {
  const { quizStore } = useStore();

  const handleClick = () => {
    if (quizStore) {
      quizStore.saveQuiz();
    }
  };

  return quizStore?.isCurrentSaved ? (
    <HeaderButton {...props} disabled>
      <Check weight="regular" />
      Saved
    </HeaderButton>
  ) : (
    <HeaderButton {...props} onClick={handleClick}>
      Save
    </HeaderButton>
  );
});

export default SaveButton;
