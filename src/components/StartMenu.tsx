import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import VariantButton from './generic/VariantButton.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import CustomError from '../utils/CustomError.ts';
import { useNavigate } from 'react-router';

const StyledStartMenu = styled.div`
  display: flex;
  flex-direction: column;

  & > button:not(:first-child) {
    margin-top: var(--padding-s);
  }
`;

const StartMenu = observer(() => {
  const { rootStore } = useStore();
  const navigate = useNavigate();

  const startQuiz = () => {
    rootStore.initQuizStore();
    navigate('/quiz');
  };

  const loadQuiz = () => {
    try {
      const savedState = rootStore.savedState;
      if (savedState.isDefined) {
        rootStore.initQuizStore(JSON.parse(savedState.data));
        navigate('/quiz');
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
      <VariantButton onClick={startQuiz} data-testid="quiz-start-button">
        New quiz
      </VariantButton>
      <VariantButton
        onClick={loadQuiz}
        data-testid="quiz-load-button"
        disabled={!rootStore.savedState.isDefined}
      >
        Load quiz
      </VariantButton>
    </StyledStartMenu>
  );
});

export default StartMenu;
