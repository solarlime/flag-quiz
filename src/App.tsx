import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Header from './components/header/Header.tsx';
import Quiz from './components/quiz/Quiz.tsx';
import { useStore } from './store/StoreProvider.tsx';
import StartMenu from './components/StartMenu.tsx';

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
  const { quizStore } = useStore();

  return (
    <>
      <Header />
      <Main>{quizStore ? <Quiz /> : <StartMenu />}</Main>
    </>
  );
});

export default App;
