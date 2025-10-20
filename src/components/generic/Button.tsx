import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-s) var(--padding-m);
  border: var(--border-width) solid;
  border-radius: var(--radius-m);
  font-size: var(--font-size-normal);
  line-height: 1;
  user-select: none;
  -webkit-user-select: none; /* For Safari */
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:has(svg:only-child) {
    padding: var(--padding-s);
  }

  & > svg:not(:only-child) {
    margin-right: var(--padding-s);
  }
`;

export default Button;
