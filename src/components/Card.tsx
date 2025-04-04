import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import AnswerVariants from './AnswerVariants.tsx';
import Flag from './Flag.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import { useEffect } from 'react';

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
  width: 100%;
  max-width: var(--card-max-width);
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.color1};
  box-sizing: border-box;
`;

const Card = observer(() => {
  const { quizStore: qStore } = useStore();
  const quizStore = qStore!;

  useEffect(() => {
    quizStore.fetchCountries();
  }, []);

  return (
    <>
      {quizStore.fetchStatus === 'loading' && <p>Loading...</p>}
      {quizStore.fetchStatus === 'error' && <p>An error occurred</p>}
      {quizStore.fetchStatus === 'done' && (
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
                <span>Score: {quizStore.score}</span>
              </TopInformation>
              <Flag info={quizStore.answer!} />
              <AnswerVariants />
            </>
          )}
        </StyledCard>
      )}
    </>
  );
});

export default Card;
