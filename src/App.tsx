import Button from './Button.tsx';
import { useStore } from './store/StoreProvider.tsx';
import { Switch } from 'radix-ui';
import styled from 'styled-components';

const StyledSwitchRoot = styled(Switch.Root)`
  width: calc((var(--font-size) + var(--border-width) * 2) * 2);
  background-color: ${(props) => props.theme.colors.color2};
  padding: calc(var(--padding-s));
  border-radius: var(--padding-m);
`;

const StyledSwitchThumb = styled(Switch.Thumb)`
  display: block;
  width: calc(var(--font-size) + var(--border-width) * 2);
  height: calc(var(--font-size) + var(--border-width) * 2);
  background-color: ${(props) => props.theme.colors.color12};
  border-radius: calc(var(--radius-m) - var(--radius-s));
  transition: transform 100ms;
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(calc(var(--font-size) + var(--border-width) * 2));
  }
`;

const StyledH1 = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 600;
  font-stretch: expanded;

  & > a {
    display: block;
    font: inherit;
    cursor: pointer;
  }
`;

const StyledH2 = styled.h2`
  display: block;
  margin-bottom: var(--padding-l);
  text-align: center;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--padding-xl);
  background-color: ${(props) => props.theme.colors.color5};
  box-sizing: border-box;
`;

const Main = styled.main`
  padding: var(--padding-xl);
`;

const Card = styled.div`
  display: block;
  width: auto;
  max-width: 640px;
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.color1};
`;

const Img = styled.img`
  display: block;
  width: 100%;
  border-radius: var(--radius-m);
  border: var(--border-width) solid ${(props) => props.theme.colors.color3};
  box-sizing: border-box;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--padding-s);
  margin-top: var(--padding-l);
`;

function App() {
  const { themeStore } = useStore();

  return (
    <>
      <StyledHeader>
        <StyledH1>
          <a href="/" title="Homepage" rel="nofollow noreferrer">
            Flag quiz
          </a>
        </StyledH1>
        <StyledSwitchRoot
          checked={themeStore.theme.name === 'dark'}
          onCheckedChange={() => themeStore.toggleTheme()}
          value={themeStore.theme.name}
        >
          <StyledSwitchThumb />
        </StyledSwitchRoot>
      </StyledHeader>
      <Main>
        <Card>
          <StyledH2>Score: 0</StyledH2>
          <picture>
            <source
              type="image/webp"
              srcSet="https://flagcdn.com/w640/es.webp,
      https://flagcdn.com/w1280/es.webp 2x"
            />
            <source
              type="image/png"
              srcSet="https://flagcdn.com/w640/es.png,
      https://flagcdn.com/w1280/es.png 2x"
            />
            <Img src="https://flagcdn.com/w640/es.png" alt="Spain" />
          </picture>
          <Buttons>
            <Button>Карл</Button>
            <Button>У Клары</Button>
            <Button>Украл</Button>
            <Button>Кораллы</Button>
          </Buttons>
        </Card>
      </Main>
    </>
  );
}

export default App;
