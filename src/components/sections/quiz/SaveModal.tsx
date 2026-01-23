import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'radix-ui';
import { Check, WarningDiamond } from '@phosphor-icons/react';
import CoreButton from '../../generic/CoreButton.tsx';
import TextNode from '../../generic/TextNode.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';
import LoadForm from '../load/LoadForm.tsx';
import { Block } from '../../generic/Block.tsx';
import Modal from '../../generic/Modal.tsx';
import useModal from '../../../hooks/useModal.ts';

const StyledWarningDiamond = styled(WarningDiamond)`
  color: ${(props) => props.theme.colors.tomato10};
`;

const StyledBlock = styled(Block)`
  position: relative;
  display: block;
  max-width: var(--card-max-width);
  max-height: calc(var(--modal-max-height) - 2 * 2 * var(--padding-l));
  overflow: auto;
  background: ${(props) => props.theme.colors.grass3};
  color: ${(props) => props.theme.colors.grass12};
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div,
  & > form {
    background-color: transparent;
  }

  & > *:not(:last-child) {
    margin-bottom: var(--padding-m);
  }
`;

const ModalTitle = styled(Dialog.Title)`
  display: block;
  width: 100%;
  font-size: var(--block-title-size);
  text-align: center;
`;

const SaveModalContent = observer(() => {
  const { quizStore, saveStore } = useStore();
  const { setOpen } = useModal();

  if (quizStore) {
    const callback = () => {
      if (saveStore.maxSavedStates > saveStore.allSavesQuantity) {
        quizStore.canBeSaved = false;
        quizStore.saveQuiz(saveStore.addSavedState);
        saveStore.updateNeeded = true;
        setOpen(false);
      }
    };

    return (
      <Modal.Content>
        <StyledBlock>
          <Wrapper>
            <ModalTitle>No free save slots!</ModalTitle>
            <Dialog.Description>
              Delete any old saved state in&nbsp;order to&nbsp;create
              the&nbsp;new one. The&nbsp;current quiz will be&nbsp;saved
              automatically.
            </Dialog.Description>
            <LoadForm callback={callback} />
          </Wrapper>
        </StyledBlock>
      </Modal.Content>
    );
  }

  return null;
});

const SaveModal = observer(() => {
  const { saveStore, quizStore } = useStore();

  if (quizStore) {
    return (
      <Modal.Root
        onOpenChange={() => {
          if (!saveStore.deleteModeEnabled) saveStore.changeDeleteModeEnabled();
        }}
      >
        {quizStore.isCurrentSaved ? (
          <CoreButton
            data-testid="quiz-save-button"
            disabled={!quizStore.canBeSaved}
          >
            <Check weight="regular" />
            <TextNode>Saved</TextNode>
          </CoreButton>
        ) : (
          <Modal.Trigger>
            <CoreButton
              data-testid="quiz-save-button"
              disabled={!quizStore.canBeSaved}
            >
              <StyledWarningDiamond
                weight="regular"
                data-testid="icon-warning"
              />
              <TextNode>Save</TextNode>
            </CoreButton>
          </Modal.Trigger>
        )}
        <SaveModalContent />
      </Modal.Root>
    );
  }

  return null;
});

export default SaveModal;
