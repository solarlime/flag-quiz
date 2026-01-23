/* eslint-disable mobx/missing-observer */

import { Dialog } from 'radix-ui';
import { type PropsWithChildren, useState } from 'react';
import { X } from '@phosphor-icons/react';
import CoreButton from './CoreButton.tsx';
import styled from 'styled-components';
import useModal, { ModalContext } from '../../hooks/useModal.ts';

const StyledModalOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  inset: 0;
  z-index: 3;

  @supports not (inset: 0) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const StyledModalContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: var(--card-max-width);
  height: auto;
  max-height: var(--modal-max-height);
  padding: calc(2 * var(--padding-l)) var(--padding-l);
  box-sizing: border-box;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

const CloseButton = styled(CoreButton)`
  position: absolute;
  top: 0;
  right: var(--padding-l);
  border-color: ${(props) => props.theme.colors.grass3};
  background: ${(props) => props.theme.colors.grass3};
  color: ${(props) => props.theme.colors.grass12};

  &:focus-visible {
    outline-color: #ffffff;
  }
`;

const ModalContent = ({ children }: PropsWithChildren) => {
  const { setOpen } = useModal();

  return (
    <Dialog.Portal>
      <StyledModalOverlay />
      <StyledModalContent className="modal-content" data-testid="modal-content">
        {children}
        <Dialog.Close onClick={() => setOpen(false)} asChild>
          <CloseButton data-testid="modal-close-button">
            <X />
            <span className="visually-hidden">Close modal</span>
          </CloseButton>
        </Dialog.Close>
      </StyledModalContent>
    </Dialog.Portal>
  );
};

const ModalTrigger = ({ children }: PropsWithChildren) => {
  const { setOpen } = useModal();

  return (
    <Dialog.Trigger onClick={() => setOpen(true)} asChild>
      {children}
    </Dialog.Trigger>
  );
};

const ModalRoot = ({
  children,
  onOpenChange,
}: PropsWithChildren<Dialog.DialogProps>) => {
  const { 0: open, 1: setOpen } = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog.Root>
    </ModalContext.Provider>
  );
};

const Modal = {
  Content: ModalContent,
  Root: ModalRoot,
  Trigger: ModalTrigger,
};

export default Modal;
