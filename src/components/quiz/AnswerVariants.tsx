import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import Button from '../generic/Button.tsx';
import { useStore } from '../../store/StoreProvider.tsx';
import { Result } from '../../interfaces/data.ts';

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  gap: var(--padding-s);
  margin-top: var(--padding-l);

  @media screen and (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const AnswerVariants = observer(() => {
  const { quizStore } = useStore();

  const handleClick = (variant: Result) => {
    if (quizStore && quizStore.answer) {
      if (variant.countryCodeAlpha2 === quizStore.answer?.countryCodeAlpha2) {
        quizStore.increaseScore();
      } else {
        quizStore.addAMistake({ chosen: variant, correct: quizStore.answer });
      }
      quizStore.increaseQuestionNumber();
      if (quizStore.questionNumber <= quizStore.maxQuestions) {
        quizStore.newQuestion();
      }
    }
  };

  return (
    <Buttons>
      {quizStore &&
        quizStore.variants.map(
          (variant) =>
            variant && (
              <Button
                key={uuidv4()}
                onClick={() => handleClick(variant)}
                data-testid="answer-variant"
              >
                {variant.name}
              </Button>
            ),
        )}
    </Buttons>
  );
});

export default AnswerVariants;
