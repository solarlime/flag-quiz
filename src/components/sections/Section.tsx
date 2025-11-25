import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { type ReactNode } from 'react';

const StyledH2 = styled.h2`
  font-size: var(--title-size);
  font-weight: 300;
  font-stretch: expanded;
`;

const StyledSectionTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: var(--padding-l);
  font-size: var(--title-size);
  box-sizing: border-box;

  @media screen and (max-width: 400px) {
    padding: 0 var(--padding-l);
  }

  & > h2 {
    align-self: center;
    flex-grow: 1;
  }

  & > h2:only-child {
    text-align: center;
  }
`;

export const SectionTitle = observer(
  ({ title, children }: { title: string; children?: ReactNode }) => {
    return (
      <StyledSectionTitle>
        <StyledH2>{title}</StyledH2>
        {children}
      </StyledSectionTitle>
    );
  },
);

export const SectionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--padding-l);
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: 701px) {
    &:has(> :nth-child(2)) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
