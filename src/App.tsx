import styled from 'styled-components';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Header from './components/Header.tsx';
import Card from './components/Card.tsx';
import { useStore } from './store/StoreProvider.tsx';

const Main = styled.main`
  padding: var(--padding-xl);
`;

const App = observer(() => {
  const { quizStore } = useStore();

  useEffect(() => {
    quizStore.fetchCountries();
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Card />
      </Main>
    </>
  );
});

export default App;
