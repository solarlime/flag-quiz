import styled from 'styled-components';

const StyledH1 = styled.h1`
  font-size: calc(
    var(--font-size) + var(--padding-s) + var(--border-width) * 2
  );
  // Safari incorrectly renders the font-weight: 600
  font-weight: 599;
  font-stretch: expanded;

  & > a {
    font: inherit;
    cursor: pointer;
  }
`;

const Title = () => {
  return (
    <StyledH1>
      <a href="/public" title="Homepage" rel="nofollow noreferrer">
        Flag quiz
      </a>
    </StyledH1>
  );
};

export default Title;
