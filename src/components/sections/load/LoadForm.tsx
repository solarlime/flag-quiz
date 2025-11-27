import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RadioGroup } from 'radix-ui';
import CoreButton from '../../generic/CoreButton.tsx';
import type { ILoadForm } from '../../../types/forms.ts';
import { useStore } from '../../../store/StoreProvider.tsx';
import SaveItem from './SaveItem.tsx';
import { Form } from '../../generic/Block.tsx';

const ChoiceGroup = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: var(--padding-s);
  margin-bottom: var(--padding-l);
`;

const LoadForm = observer(() => {
  const { rootStore, saveStore } = useStore();
  const { states } = saveStore;
  const navigate = useNavigate();

  if (states.areAvailableToLoad) {
    const methods = useForm<ILoadForm>({
      mode: 'onSubmit',
      defaultValues: {
        savedQuizId: states.saved[0].id,
      },
    });

    const { handleSubmit, setValue } = methods;

    const onSubmit: SubmitHandler<ILoadForm> = (data) => {
      rootStore.initQuizStore(data);
      navigate('/quiz');
    };

    return (
      <Form
        name="new-quiz-form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="parameters-form"
      >
        <ChoiceGroup
          defaultValue={states.saved[0].id}
          onValueChange={(value) => {
            setValue('savedQuizId', value);
          }}
          aria-label="Choose a saved quiz"
        >
          {states.saved.map((savedState) => (
            <SaveItem key={savedState.id} savedState={savedState} />
          ))}
        </ChoiceGroup>
        <CoreButton data-testid="quiz-start-button">Start quiz</CoreButton>
      </Form>
    );
  }

  return null;
});

export default LoadForm;
