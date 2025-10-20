import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Header from './components/header/Header.tsx';
import { Outlet } from 'react-router';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xl) var(--padding-l);
  margin: 0 auto;
  max-width: 1300px;
  box-sizing: border-box;

  &:has(form) {
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    padding: var(--padding-xl) 0;
  }
`;

const App = observer(() => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
});

export default App;
