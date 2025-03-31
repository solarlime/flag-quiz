import Button from './Button.tsx';
import { useStore } from './store/StoreProvider.tsx';
import { Switch } from 'radix-ui';
import styled, { css } from 'styled-components';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';

const StyledSwitchRoot = styled(Switch.Root)`
  width: calc((var(--font-size) + var(--border-width) * 2) * 2);
  background-color: ${(props) => props.theme.colors.color2};
  padding: calc(var(--padding-s));
  border-radius: var(--padding-m);
`;

const StyledSwitchThumb = styled(Switch.Thumb)`
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
    font: inherit;
    cursor: pointer;
  }
`;

const TopInformation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--padding-l);

  &:only-child {
    margin-bottom: 0;
  }

  & > span {
    flex-basis: 5%;
    flex-grow: 1;
    text-align: center;
    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  }
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
  width: auto;
  max-width: 640px;
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.color1};
`;

const Flag = styled.div`
  display: flex;
  align-items: center;
  aspect-ratio: 3/2;

  & img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-m);
    border: var(--border-width) solid ${(props) => props.theme.colors.color3};
    box-sizing: border-box;
    object-fit: contain;
    object-position: center center;

    ${(props) =>
      props.theme.name === 'dark' &&
      css`
        filter: opacity(0.9);
      `}
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--padding-s);
  margin-top: var(--padding-l);
`;

const App = observer(() => {
  const { themeStore, quizStore } = useStore();

  useEffect(() => {
    quizStore.fetchCountries();
  }, []);

  const handleClick = (countryCode: string) => {
    if (countryCode === quizStore.answer?.countryCodeAlpha2) {
      quizStore.increaseScore();
    }
    quizStore.increaseQuestionNumber();
    quizStore.newQuestion();
  };

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
          {quizStore.questionNumber > quizStore.maxQuestions ? (
            <TopInformation>
              <span>
                That&apos;s all! You answered {quizStore.score} times out of{' '}
                {quizStore.maxQuestions}
              </span>
              <span>Score: {quizStore.score}</span>
            </TopInformation>
          ) : (
            <>
              <TopInformation>
                <span>
                  Question: {quizStore.questionNumber}/{quizStore.maxQuestions}
                </span>
                {quizStore.fetchStatus === 'done' && <span>Guess it!</span>}
                <span>Score: {quizStore.score}</span>
              </TopInformation>
              <Flag>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`https://flagcdn.com/w640/${quizStore.answer?.countryCodeAlpha2}.webp,
      https://flagcdn.com/w1280/${quizStore.answer?.countryCodeAlpha2}.webp 2x`}
                  />
                  <source
                    type="image/png"
                    srcSet={`https://flagcdn.com/w640/${quizStore.answer?.countryCodeAlpha2?.[0]}.png,
      https://flagcdn.com/w1280/${quizStore.answer?.countryCodeAlpha2}.png 2x`}
                  />
                  <img
                    src={`https://flagcdn.com/w640/${quizStore.answer?.countryCodeAlpha2}.png`}
                    alt="Guess it!"
                  />
                </picture>
              </Flag>
              <Buttons>
                {quizStore.variants.map((variant) => (
                  <Button
                    key={uuidv4()}
                    onClick={() => handleClick(variant.countryCodeAlpha2)}
                  >
                    {variant.name}
                  </Button>
                ))}
              </Buttons>
            </>
          )}
        </Card>
      </Main>
    </>
  );
});

export default App;
