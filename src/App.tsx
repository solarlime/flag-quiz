import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Header from './components/Header.tsx';
import Card from './components/Card.tsx';
import { useStore } from './store/StoreProvider.tsx';
import Button from './components/Button.tsx';

const Main = styled.main`
  padding: var(--padding-xl);
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
        {quizStore ? <Card /> : <Button onClick={startQuiz}>New quiz</Button>}
      </Main>
    </>
  );
});

export default App;
