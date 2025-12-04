import {
  useState,
  useEffect,
  type ComponentProps,
  type MouseEvent as ReactMouseEvent,
  useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import ButtonFactory from './ButtonFactory.tsx';
import waitFor from '../../utils/waitFor.ts';

const DeleteButton = observer(
  ({
    children,
    filled = true,
    ...props
  }: ComponentProps<typeof ButtonFactory> & { filled: boolean }) => {
    return (
      <ButtonFactory {...props} $colorPrefix="tomato" $filled={filled}>
        {children}
      </ButtonFactory>
    );
  },
);

const DelayedDeleteButton = observer(
  ({ children, onClick, ...props }: ComponentProps<typeof DeleteButton>) => {
    const { 0: clicked, 1: setClicked } = useState(false);
    const { 0: countdown, 1: setCountdown } = useState(5);
    const abortControllerRef = useRef({
      controller: new AbortController(),
    });

    const reset = () => {
      abortControllerRef.current.controller.abort();
      setClicked(false);
      setCountdown(5);
      abortControllerRef.current.controller = new AbortController();
    };

    useEffect(() => {
      if (!clicked) return;
      waitFor(1000).then(() => {
        if (countdown > 0) {
          setCountdown((prev) => prev - 1);
        } else {
          waitFor(5000, abortControllerRef.current.controller.signal).then(
            reset,
            () => {
              console.log('waiting aborted');
            },
          );
        }
      });
    }, [countdown, clicked]);

    const wrappedOnClick = (
      event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (onClick) {
        onClick(event);
      }
      reset();
    };

    return !clicked ? (
      <DeleteButton {...props} onClick={() => setClicked(true)}>
        {children}
      </DeleteButton>
    ) : countdown > 0 ? (
      <DeleteButton {...props} disabled>
        Confirm in {countdown}s
      </DeleteButton>
    ) : (
      <DeleteButton {...props} onClick={wrappedOnClick}>
        {children} now
      </DeleteButton>
    );
  },
);

export { DelayedDeleteButton, DeleteButton };
