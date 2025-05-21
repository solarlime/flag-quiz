import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Button from './generic/Button.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import CustomError from '../utils/CustomError.ts';

const StyledStartMenu = styled.div`
  display: flex;
  flex-direction: column;

  & > button:not(:first-child) {
    margin-top: var(--padding-s);
  }
`;

const StartMenu = observer(() => {
  const { rootStore } = useStore();

  const startQuiz = () => {
    rootStore.initQuizStore();
  };

  const loadQuiz = () => {
    try {
      const savedState = localStorage.getItem('savedState');
      if (savedState) {
        rootStore.initQuizStore(JSON.parse(savedState));
      } else {
        throw new CustomError('No saved quiz found');
      }
    } catch (e) {
      if (e instanceof CustomError) {
        alert(e.message);
      } else {
        alert('The saved quiz is corrupted');
      }
    }
  };

  return (
    <StyledStartMenu>
      <Button onClick={startQuiz} data-testid="quiz-start-button">
        New quiz
      </Button>
      <Button onClick={loadQuiz} data-testid="quiz-load-button">
        Load quiz
      </Button>
    </StyledStartMenu>
  );
});

export default StartMenu;
