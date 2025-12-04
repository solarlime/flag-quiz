import styled, { css } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRef, useState, useTransition } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RadioGroup } from 'radix-ui';
import { Check } from '@phosphor-icons/react';
import CoreButton from '../../generic/CoreButton.tsx';
import type { ILoadForm } from '../../../types/forms.ts';
import { useStore } from '../../../store/StoreProvider.tsx';
import SaveItem from './SaveItem.tsx';
import { Form } from '../../generic/Block.tsx';
import DelayedDeleteButton from '../../generic/DelayedDeleteButton.tsx';
import waitFor from '../../../utils/waitFor.ts';
import TextNode from '../../generic/TextNode.tsx';

const ChoiceGroup = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: var(--padding-s);
  margin-bottom: var(--padding-l);
`;

const stickyStyles = css`
  position: sticky;
  bottom: var(--padding-l);
`;

const StickyCoreButton = styled(CoreButton)`
  ${stickyStyles};
`;

const StickyDelayedDeleteButton = styled(DelayedDeleteButton)`
  ${stickyStyles};
`;

const StyledForm = styled(Form)`
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.5s ease-out 0.5s,
    visibility 0.5s ease-out 0.5s;
`;

const LoadForm = observer(() => {
  const ref = useRef<HTMLFormElement>(null);
  const { rootStore, saveStore } = useStore();
  const { deleteModeEnabled } = saveStore;
  const navigate = useNavigate();
  const { 0: isPending, 1: startTransition } = useTransition();
  const { 0: isDisabled, 1: setIsDisabled } = useState(false);

  if (saveStore.states.areAvailableToLoad) {
    const methods = useForm<ILoadForm>({
      mode: 'onSubmit',
      defaultValues: {
        savedQuizId: saveStore.states.saved[0].id,
      },
    });

    const { handleSubmit, setValue, watch } = methods;
    const watchedValue = watch('savedQuizId');

    const onSubmit: SubmitHandler<ILoadForm> = (data) => {
      if (saveStore.states.areAvailableToLoad) {
        if (deleteModeEnabled) {
          startTransition(async () => {
            if (saveStore.states.areAvailableToLoad) {
              if (saveStore.states.saved.length === 1) {
                ref.current!.classList.add('fade');
                await waitFor(1000);
                saveStore.toggleDeleteModeEnabled();
              }
              saveStore.deleteSavedState(data);
              methods.reset({ savedQuizId: saveStore.states.saved?.[0].id });
            }
          });
        } else {
          rootStore.initQuizStore(data);
          navigate('/quiz');
        }
      }
    };

    return (
      <StyledForm
        name="new-quiz-form"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="parameters-form"
        ref={ref}
      >
        <ChoiceGroup
          value={watchedValue}
          onValueChange={(value) => {
            setValue('savedQuizId', value);
          }}
          aria-label="Choose a saved quiz"
        >
          {saveStore.states.saved.map((savedState) => (
            <SaveItem
              key={savedState.id}
              savedState={savedState}
              isDisabled={isDisabled}
            />
          ))}
        </ChoiceGroup>
        {deleteModeEnabled ? (
          !isPending ? (
            <StickyDelayedDeleteButton
              setIsDisabled={setIsDisabled}
              data-testid="quiz-delete-button"
              withCancel
            >
              Delete quiz
            </StickyDelayedDeleteButton>
          ) : (
            <StickyDelayedDeleteButton
              data-testid="quiz-delete-button"
              disabled
            >
              <Check weight="regular" />
              <TextNode>Successfully deleted</TextNode>
            </StickyDelayedDeleteButton>
          )
        ) : (
          <StickyCoreButton data-testid="quiz-start-button">
            Start quiz
          </StickyCoreButton>
        )}
      </StyledForm>
    );
  }

  return null;
});

export default LoadForm;
