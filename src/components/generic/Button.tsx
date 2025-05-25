import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.color3};
  color: ${(props) => props.theme.colors.color10};
  border: var(--border-width) solid ${(props) => props.theme.colors.color7};
  border-radius: var(--radius-m);
  text-align: center;
  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.colors.color5};
    border-color: ${(props) => props.theme.colors.color8};
  }

  &:disabled {
    color: ${(props) => props.theme.colors.color6};
    cursor: not-allowed;
  }
`;

export default Button;
