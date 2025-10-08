import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: ${(props) => props.theme.colors.color3};
    color: ${(props) => props.theme.colors.color12};
  }
    
  body * {
    display: block;
    padding: 0;
    margin: 0;
    font-family: "DINish", Arial, sans-serif;
    font-stretch: normal;
    // font-style: oblique 8deg;
    // Works in FF & Chrome but Safari needs -8deg. Setting via font-variation-settings works everywhere
    font-variation-settings: "slnt" -8;
    font-size: var(--font-size);
    line-height: 1.2;
    font-weight: 300;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
    
  button {
    padding: var(--padding-s) var(--padding-m);
    border-radius: var(--radius-m);
    line-height: 1;
    cursor: pointer;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: var(--border-width) solid ${(props) => props.theme.colors.color12};
    outline-offset: var(--border-width);
  }
`;
