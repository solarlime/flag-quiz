import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 400px) {
    padding: 0 var(--padding-l);
  }
`;

export default Form;
