import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: ${(props) => props.theme.colors.grass3};
    color: ${(props) => props.theme.colors.grass12};
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
    font-size: var(--font-size-normal);
    line-height: 1.2;
    font-weight: 400;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: var(--border-width) solid ${(props) => props.theme.colors.grass12};
    outline-offset: var(--border-width);
  }
  
  body .fade {
    visibility: hidden;
    opacity: 0;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }
`;
