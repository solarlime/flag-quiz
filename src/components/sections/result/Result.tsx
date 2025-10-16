import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import Flag from '../quiz/Flag.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';
import SectionTitle from '../SectionTitle.tsx';

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
    text-align: left;

    &:last-child:not(:first-child) {
      text-align: right;
    }
  }
`;

const StyledCard = styled.div`
  width: 100%;
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.color1};
  box-sizing: border-box;
`;

const Mistakes = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--padding-s);
  align-items: stretch;

  @media screen and (max-width: 500px) {
    grid-template-columns: 100%;
  }

  @media screen and (min-width: 701px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1001px) {
    grid-template-columns: repeat(4, 1fr);
  }

  & > li > figure > div {
    aspect-ratio: 3/2;
  }
`;

const MistakesTitle = styled.h3`
  margin-bottom: var(--padding-l);
`;

const Result = observer(() => {
  const { quizStore: qStore } = useStore();
  const quizStore = qStore!;

  return (
    <>
      <SectionTitle title="Result">
        {+(quizStore.score / quizStore.maxQuestions).toFixed(1) < 0.4
          ? '🤨'
          : +(quizStore.score / quizStore.maxQuestions).toFixed(1) < 0.6
            ? '😐'
            : +(quizStore.score / quizStore.maxQuestions).toFixed(1) < 0.8
              ? '😌'
              : '😊'}
      </SectionTitle>
      <StyledCard>
        <TopInformation>
          <span data-testid="quiz-result">
            You answered correctly {quizStore.score} time
            {quizStore.score !== 1 && 's'} out of {quizStore.maxQuestions}!
          </span>
        </TopInformation>
        {quizStore.mistakes.length ? (
          <div>
            <MistakesTitle>Here are your mistakes:</MistakesTitle>
            <Mistakes>
              {quizStore.mistakes.map((mistake) => (
                <li key={uuidv4()} data-testid="mistake">
                  <Flag info={mistake.correct}>
                    <p>Correct answer: {mistake.correct.name}</p>
                    <p>Your answer: {mistake.chosen.name}</p>
                  </Flag>
                </li>
              ))}
            </Mistakes>
          </div>
        ) : null}
      </StyledCard>
    </>
  );
});

export default Result;
