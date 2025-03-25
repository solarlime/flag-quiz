import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
      all: unset;
      background: ${(props) => props.theme.colors.color3};
      color: ${(props) => props.theme.colors.color12};
  }
    
  body * {
      all: unset;
      font-family: "DINish", Arial, sans-serif;
      font-variant-numeric: diagonal-fractions;
      font-stretch: normal;
      font-style: oblique 8deg;
      font-size: var(--font-size);
      line-height: 1.2;
      font-weight: 300;
  }
  
  #root {
      display: flex;
      flex-direction: column;
  }
    
  button {
      padding: var(--padding-s) var(--padding-m);
      border-radius: var(--radius-m);
      line-height: 1;
      cursor: pointer;
  }

  :focus-visible {
      outline: var(--border-width) solid ${(props) => props.theme.colors.color12};
      outline-offset: var(--border-width);
  }
`;
