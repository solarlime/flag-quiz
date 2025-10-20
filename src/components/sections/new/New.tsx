import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CoreButton from '../../generic/CoreButton.tsx';
import StepNumberInput from './StepNumberInput.tsx';
import { IQuizForm } from '../../../interfaces/quizForm.ts';
import { useStore } from '../../../store/StoreProvider.tsx';
import type { TParameters } from '../../../interfaces/quizForm.ts';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 400px) {
    padding: 0 var(--padding-l);
  }
`;

const Field = styled.div`
  display: grid;
  justify-content: center;
  gap: var(--padding-s);
  width: 100%;
  margin-bottom: var(--padding-l);
`;

const Label = styled.label`
  text-align: center;
`;

const ErrorComponent = styled.p`
  font-size: var(--font-size-lower);
  text-align: center;
`;

const New = observer(() => {
  const methods = useForm<IQuizForm>({
    defaultValues: { questionsQuantity: 10 },
    mode: 'onSubmit',
  });
  const { rootStore } = useStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = methods;
  const minValue = import.meta.env.VITE_MIN_QUESTIONS
    ? +import.meta.env.VITE_MIN_QUESTIONS
    : 5;
  const maxValue = import.meta.env.VITE_MAX_QUESTIONS
    ? +import.meta.env.VITE_MAX_QUESTIONS
    : 30;

  const startQuiz = (parametersObj: TParameters) => {
    rootStore.initQuizStore(parametersObj);
    navigate('/quiz');
  };

  const onSubmit: SubmitHandler<IQuizForm> = (data) =>
    startQuiz({ parameters: data });

  const changeValue = (direction: '+' | '-') => {
    if (errors.questionsQuantity) {
      clearErrors();
    }
    const currentValue = getValues('questionsQuantity');
    if (direction === '-' && currentValue > minValue) {
      setValue('questionsQuantity', currentValue - 1);
    }
    if (direction === '+' && currentValue < maxValue) {
      setValue('questionsQuantity', currentValue + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form name="new-quiz-form" onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label htmlFor="questionsQuantity">How many questions?</Label>
          <StepNumberInput
            changeValue={changeValue}
            minValue={minValue}
            maxValue={maxValue}
          />
          {errors.questionsQuantity && (
            <ErrorComponent>{errors.questionsQuantity.message}</ErrorComponent>
          )}
        </Field>
        <CoreButton
          disabled={!!errors.questionsQuantity}
          data-testid="quiz-start-button"
        >
          Start quiz
        </CoreButton>
      </Form>
    </FormProvider>
  );
});

export default New;
