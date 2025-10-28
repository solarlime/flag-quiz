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
  font-family: Courier, monospace;
  font-size: var(--font-size-lower);
  padding: var(--padding-s);
  border-radius: var(--padding-s);
  background: ${(props) => props.theme.colors.color2};
  word-break: break-word;
`;
