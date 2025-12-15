import styled from 'styled-components';
import { useState, useEffect, type ComponentProps, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import waitFor from '../../utils/waitFor.ts';
import DeleteButton from './DeleteButton.tsx';
import CoreButton from './CoreButton.tsx';

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--padding-s);
`;

const DelayedDeleteButton = observer(
  ({
    children,
    setIsDisabled,
    onClick,
    withCancel = false,
    ...props
  }: ComponentProps<typeof DeleteButton> & {
    setIsDisabled?: (arg: boolean) => void;
    withCancel?: boolean;
  }) => {
    const { 0: clicked, 1: setClicked } = useState(false);
    const { 0: countdown, 1: setCountdown } = useState(5);
    const abortControllerRef = useRef({
      controller: new AbortController(),
    });

    const reset = () => {
      abortControllerRef.current.controller.abort();
      if (setIsDisabled) setIsDisabled(false);
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
          waitFor(10000, abortControllerRef.current.controller.signal).then(
            reset,
            () => {
              console.log('waiting aborted');
            },
          );
        }
      });
    }, [countdown, clicked]);

    const wrappedOnClick = () => {
      if (setIsDisabled) setIsDisabled(true);
      setClicked(true);
    };

    return !clicked ? (
      <DeleteButton {...props} onClick={wrappedOnClick} filled={false}>
        {children}
      </DeleteButton>
    ) : countdown > 0 ? (
      <ButtonGroup>
        <DeleteButton {...props} disabled>
          Confirm in {countdown}s
        </DeleteButton>
        {withCancel && (
          <CoreButton filled={false} onClick={reset}>
            Cancel
          </CoreButton>
        )}
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        {/* setTimeout delays onClick execution to let the form's onSubmit run first */}
        <DeleteButton
          {...props}
          onClick={(event) =>
            setTimeout(() => {
              if (onClick) {
                onClick(event);
              }
              reset();
            }, 0)
          }
        >
          {children} now
        </DeleteButton>
        {withCancel && (
          <CoreButton
            filled={false}
            onClick={reset}
            data-testid="delete-cancel-button"
          >
            Cancel
          </CoreButton>
        )}
      </ButtonGroup>
    );
  },
);

export default DelayedDeleteButton;
