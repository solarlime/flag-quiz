import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button.tsx';
import { useStore } from '../store/StoreProvider.tsx';

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: var(--padding-s);
  margin-top: var(--padding-l);
`;

const AnswerVariants = () => {
  const { quizStore } = useStore();

  const handleClick = (countryCode: string) => {
    if (quizStore) {
      if (countryCode === quizStore.answer?.countryCodeAlpha2) {
        quizStore.increaseScore();
      }
      quizStore.increaseQuestionNumber();
      quizStore.newQuestion();
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
                onClick={() => handleClick(variant.countryCodeAlpha2)}
              >
                {variant.name}
              </Button>
            ),
        )}
    </Buttons>
  );
};

export default AnswerVariants;
