import styled from 'styled-components';

export const ErrorDescription = styled.div`
  align-self: center;
  text-align: center;
  max-width: 600px;
  box-sizing: border-box;

  @media screen and (max-width: 400px) {
    padding: 0 var(--padding-l);
  }

  & > *:not(:last-child) {
    margin-bottom: var(--padding-m);
  }
`;

export const ErrorMessage = styled.p`
  font-family: 'DINish', Courier, monospace;
  font-stretch: expanded;
  // font-style: oblique 4deg;
  // Works in FF & Chrome but Safari needs -8deg. Setting via font-variation-settings works everywhere
  font-variation-settings: 'slnt' -4;
  font-size: var(--font-size-small);
  padding: var(--padding-s);
  border-radius: var(--padding-s);
  background: ${(props) => props.theme.colors.grass2};
  word-break: break-word;
`;
