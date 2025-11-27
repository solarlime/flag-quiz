import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { WarningDiamond } from '@phosphor-icons/react';
import { useRef } from 'react';
import DeleteCorrupted from './DeleteCorrupted.tsx';
import { useStore } from '../../../store/StoreProvider.tsx';
import { Block } from '../../generic/Block.tsx';
import TextNode from '../../generic/TextNode.tsx';

const StyledBlock = styled(Block)`
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.5s ease-out 0.5s,
    visibility 0.5s ease-out 0.5s;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  gap: var(--padding-s);
  margin-bottom: var(--padding-l);
  color: ${(props) => props.theme.colors.tomato10};

  & > span {
    padding: calc(var(--font-size-normal) - var(--font-size-small)) 0;
  }

  & > svg {
    flex-shrink: 0;
    align-self: flex-start;
  }
`;

const LoadWarning = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { saveStore } = useStore();
  const { states } = saveStore;

  if (states.corrupted && states.corrupted.length > 0) {
    return (
      <StyledBlock ref={ref}>
        <Description>
          <WarningDiamond weight="regular" size={'var(--font-size-bigger)'} />
          <TextNode>
            Failed to load {states.corrupted.length} saved quiz
            {states.corrupted.length > 1 && 'zes'}
          </TextNode>
        </Description>
        <DeleteCorrupted forwardedRef={ref} />
      </StyledBlock>
    );
  }

  return null;
});

export default LoadWarning;
