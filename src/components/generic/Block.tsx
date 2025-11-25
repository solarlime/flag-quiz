import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: var(--padding-l);
  margin: 0 auto;
  border-radius: var(--radius-xl);
  background-color: ${(props) => props.theme.colors.grass1};
  box-sizing: border-box;
`;

export const Form = styled(Block).attrs({ as: 'form' })``;
