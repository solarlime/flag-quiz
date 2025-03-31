import styled, { css } from 'styled-components';
import { observer } from 'mobx-react-lite';
import AnswerVariants from './AnswerVariants.tsx';
import { useStore } from '../store/StoreProvider.tsx';

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

const StyledCard = styled.div`
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

const Card = observer(() => {
  const { quizStore } = useStore();

  return (
    <StyledCard>
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
          <AnswerVariants />
        </>
      )}
    </StyledCard>
  );
});

export default Card;
