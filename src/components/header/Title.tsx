import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import Logo from '../../assets/images/logo.svg';

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
    color: inherit;

    & > svg {
      height: calc(
        var(--font-size) + var(--padding-s) + var(--border-width) * 2
      );
    }
  }
`;

const Title = observer(() => {
  return (
    <StyledH1>
      <a href="/" title="Homepage" rel="nofollow noreferrer">
        <Logo />
      </a>
    </StyledH1>
  );
});

export default Title;
