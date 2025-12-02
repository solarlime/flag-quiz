import { observer } from 'mobx-react-lite';
import { Check } from '@phosphor-icons/react';
import { type RefObject, useTransition } from 'react';
import { useStore } from '../../../store/StoreProvider.tsx';
import {
  DelayedDeleteButton,
  DeleteButton,
} from '../../generic/DeleteButton.tsx';
import TextNode from '../../generic/TextNode.tsx';
import waitFor from '../../../utils/waitFor.ts';

const DeleteCorrupted = observer(
  ({
    forwardedRef: ref,
  }: {
    forwardedRef: RefObject<HTMLDivElement | null>;
  }) => {
    const { 0: isPending, 1: startTransition } = useTransition();
    const { saveStore } = useStore();

    const handleClick = () => {
      if (ref.current) {
        startTransition(async () => {
          ref.current!.classList.add('fade');
          await waitFor(1000);
          saveStore.deleteCorruptedStates();
        });
      }
    };

    return !isPending ? (
      <DelayedDeleteButton onClick={handleClick}>
        Delete corrupted
      </DelayedDeleteButton>
    ) : (
      <DeleteButton disabled>
        <Check weight="regular" />
        <TextNode>Successfully deleted</TextNode>
      </DeleteButton>
    );
  },
);

export default DeleteCorrupted;
