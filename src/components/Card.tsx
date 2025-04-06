import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
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
            <>
              <TopInformation>
                <span>
                  You answered correctly {quizStore.score} time
                  {quizStore.score !== 1 && 's'} out of {quizStore.maxQuestions}
                </span>
              </TopInformation>
              <div>
                <h3>Your mistakes:</h3>
                <ul>
                  {quizStore.mistakes.map((mistake) => (
                    <li key={uuidv4()}>
                      <Flag info={mistake.correct} />
                      <p>Correct answer: {mistake.correct.name}</p>
                      <p>Your answer: {mistake.chosen.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
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
