import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Header from './components/header/Header.tsx';
import Quiz from './components/quiz/Quiz.tsx';
import { useStore } from './store/StoreProvider.tsx';
import Button from './components/generic/Button.tsx';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xl) var(--padding-l);

  @media screen and (max-width: 400px) {
    padding: var(--padding-xl) 0;
  }
`;

const App = observer(() => {
  const { rootStore, quizStore } = useStore();

  const startQuiz = () => {
    rootStore.initQuizStore();
  };

  return (
    <>
      <Header />
      <Main>
        {quizStore ? (
          <Quiz />
        ) : (
          <Button onClick={startQuiz} data-testid="quiz-start-button">
            New quiz
          </Button>
        )}
      </Main>
    </>
  );
});

export default App;
