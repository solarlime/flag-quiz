import styled from 'styled-components';

const StyledH1 = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: 600;
  font-stretch: expanded;

  & > a {
    font: inherit;
    cursor: pointer;
  }
`;

const Title = () => {
  return (
    <StyledH1>
      <a href="/" title="Homepage" rel="nofollow noreferrer">
        Flag quiz
      </a>
    </StyledH1>
  );
};

export default Title;
