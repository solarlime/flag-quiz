import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import CoreButton from './generic/CoreButton.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import { ErrorMessage } from './errorHandlers/errorStyles.ts';

const StyledStartMenu = styled.div`
  display: flex;
  flex-direction: column;

  & > button:not(:first-child) {
    margin-top: var(--padding-s);
  }
`;

const StyledErrorMessage = styled(ErrorMessage)`
  margin-top: var(--padding-l);
`;

const StartMenu = observer(() => {
  const { rootStore } = useStore();
  const { states } = rootStore;
  const navigate = useNavigate();

  const loadQuiz = () => {
    if (states.areAvailableToLoad) {
      if (states.saved.length === 1) {
        const savedState = states.saved[0];
        rootStore.initQuizStore(savedState);
        navigate('/quiz');
      } else {
        navigate('/load');
      }
    }
  };

  return (
    <>
      <StyledStartMenu>
        <CoreButton
          onClick={() => navigate('/new')}
          data-testid="quiz-new-button"
        >
          New quiz
        </CoreButton>
        <CoreButton
          onClick={loadQuiz}
          data-testid="quiz-load-button"
          disabled={!states.areAvailableToLoad}
        >
          Load quiz
        </CoreButton>
      </StyledStartMenu>
      {states.corrupted && states.corrupted.length > 0 && (
        <StyledErrorMessage>
          Failed to load {states.corrupted.length} saved quiz
          {states.corrupted.length > 1 && 'zes'}
        </StyledErrorMessage>
      )}
    </>
  );
});

export default StartMenu;
