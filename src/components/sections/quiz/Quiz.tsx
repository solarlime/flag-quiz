import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import AnswerVariants from './AnswerVariants.tsx';
import Flag from './Flag.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';
import SaveButton from './SaveButton.tsx';
import { SectionTitle } from '../Section.tsx';

const TopInformation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--padding-l);

  @media screen and (min-width: 701px) {
    grid-area: top-information;
  }

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

const Question = styled.span`
  &:before {
    content: 'Question: ';

    @media screen and (max-width: 400px) {
      content: '';
    }
  }
`;

const StyledCard = styled.div`
  width: 100%;
  max-width: var(--card-max-width);
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.grass1};
  box-sizing: border-box;

  @media screen and (min-width: 701px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'top-information top-information' 'flag answers';
    column-gap: var(--padding-l);
    max-width: unset;
  }

  @media screen and (min-width: 1001px) {
    grid-template-areas: 'flag top-information' 'flag answers';
  }
`;

const Quiz = observer(() => {
  const { quizStore: qStore } = useStore();
  const quizStore = qStore!;

  useEffect(() => {
    if (quizStore.fetchStatus === 'idle') {
      quizStore.fetchCountries();
    }
  }, []);

  return (
    <>
      {quizStore.fetchStatus === 'loading' && <p>Loading...</p>}
      {quizStore.fetchStatus === 'error' && <p>An error occurred</p>}
      {quizStore.fetchStatus === 'done' && (
        <>
          {quizStore.questionNumber > quizStore.questionsQuantity ? (
            <Navigate to="/result" />
          ) : (
            <>
              <SectionTitle title="Quiz">
                <SaveButton data-testid="quiz-save-button" />
              </SectionTitle>
              <StyledCard>
                <TopInformation>
                  <Question data-testid="question-number">
                    {quizStore.questionNumber}/{quizStore.questionsQuantity}
                  </Question>
                  <span data-testid="score">Score: {quizStore.score}</span>
                </TopInformation>
                <Flag info={quizStore.answer!} />
                <AnswerVariants />
              </StyledCard>
            </>
          )}
        </>
      )}
    </>
  );
});

export default Quiz;
