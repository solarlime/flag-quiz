import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import VariantButton from '../../generic/VariantButton.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';
import type { IResult } from '../../../interfaces/data.ts';
import waitFor from '../../../utils/waitFor.ts';

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

  @media screen and (min-width: 701px) {
    grid-area: answers;
    margin-top: 0;
  }

  @media screen and (min-width: 701px) and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  & button:disabled:not(.fade) {
    color: ${(props) => props.theme.colors.color1};
    border-color: ${(props) => props.theme.colors.color9};
    background-color: ${(props) => props.theme.colors.color9};
  }
`;

const AnswerVariants = observer(() => {
  const { quizStore } = useStore();
  const buttons = useRef<Array<HTMLButtonElement>>([]);

  const handleClick = async (variant: IResult) => {
    if (quizStore && quizStore.answer) {
      buttons.current.forEach((button) => {
        button.disabled = true;
        if (button.name !== quizStore.answer?.name)
          button.classList.add('fade');
      });
      await waitFor(1000);
      if (variant.countryCodeAlpha2 === quizStore.answer?.countryCodeAlpha2) {
        quizStore.increaseScore();
      } else {
        quizStore.addAMistake({
          chosen: variant,
          correct: quizStore.answer,
        });
      }
      quizStore.increaseQuestionNumber();
      if (quizStore.questionNumber <= quizStore.questionsQuantity) {
        quizStore.newQuestion();
      }
    }
  };

  return (
    <Buttons>
      {quizStore &&
        quizStore.variants.map(
          (variant, i) =>
            variant && (
              <VariantButton
                key={uuidv4()}
                name={variant.name}
                onClick={() => handleClick(variant)}
                ref={(el) => {
                  buttons.current[i] = el!;
                }}
                data-testid="answer-variant"
              >
                {variant.name}
              </VariantButton>
            ),
        )}
    </Buttons>
  );
});

export default AnswerVariants;
