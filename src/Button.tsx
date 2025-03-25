import styled from 'styled-components';

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.color3};
  color: ${(props) => props.theme.colors.color10};
  border: var(--border-width) solid ${(props) => props.theme.colors.color7};
  border-radius: var(--radius-m);
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.color5};
    border-color: ${(props) => props.theme.colors.color8};
  }
`;

export default Button;
