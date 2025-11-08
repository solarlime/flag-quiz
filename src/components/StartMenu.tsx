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
  const { savedState } = rootStore;
  const navigate = useNavigate();

  const loadQuiz = () => {
    if (savedState.isDefined) {
      rootStore.initQuizStore(savedState.data);
      navigate('/quiz');
    } else {
      alert(savedState.data.message);
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
          disabled={!savedState.isDefined}
        >
          Load quiz
        </CoreButton>
      </StyledStartMenu>
      {!savedState.isDefined && (
        <StyledErrorMessage>{savedState.data.message}</StyledErrorMessage>
      )}
    </>
  );
});

export default StartMenu;
