import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';
import { WarningDiamond } from '@phosphor-icons/react';
import CoreButton from './generic/CoreButton.tsx';
import { useStore } from '../store/StoreProvider.tsx';
import { SectionContent } from './sections/Section.tsx';
import TextNode from './generic/TextNode.tsx';

const StyledStartMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button:not(:first-child) {
    margin-top: var(--padding-s);
  }
`;

const StyledWarningDiamond = styled(WarningDiamond)`
  color: ${(props) => props.theme.colors.tomato10};
`;

const StartMenu = observer(() => {
  const { rootStore, saveStore } = useStore();
  const { states } = saveStore;
  const navigate = useNavigate();

  const loadQuiz = () => {
    if (states.areAvailableToLoad) {
      if (states.saved.length === 1 && states.corrupted.length === 0) {
        const savedState = states.saved[0];
        rootStore.initQuizStore(savedState);
        navigate('/quiz');
      } else {
        navigate('/load');
      }
    } else if (states.corrupted) {
      navigate('/load');
    }
  };

  return (
    <SectionContent>
      <StyledStartMenu>
        <CoreButton
          onClick={() => navigate('/new')}
          data-testid="quiz-new-button"
        >
          New quiz
        </CoreButton>
        <CoreButton
          onClick={loadQuiz}
          data-testid="quiz-load-button"
          disabled={!states.areAvailableToLoad && !states.corrupted}
        >
          {states.corrupted && states.corrupted.length > 0 && (
            <StyledWarningDiamond weight="regular" data-testid="icon-warning" />
          )}
          <TextNode>Load quiz</TextNode>
        </CoreButton>
      </StyledStartMenu>
    </SectionContent>
  );
});

export default StartMenu;
