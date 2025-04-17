import { ComponentProps } from 'react';
import HeaderButton from './HeaderButton.tsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/StoreProvider.tsx';

const SaveButton = observer((props: ComponentProps<typeof HeaderButton>) => {
  const { quizStore } = useStore();

  const handleClick = () => {
    if (quizStore) {
      quizStore.saveQuiz();
    }
  };

  return <HeaderButton {...props} onClick={handleClick} />;
});

export default SaveButton;
