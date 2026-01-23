import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from 'react';

type TModalContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<TModalContext | null>(null);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used inside its root component');
  }

  return context;
};

export default useModal;
