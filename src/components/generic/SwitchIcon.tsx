import styled from 'styled-components';

const SwitchIcon = styled.span.attrs({ className: 'icon' })<{
  $danger?: boolean;
}>`
  flex-shrink: 0;
  color: ${(props) =>
    props.$danger ? props.theme.colors.tomato12 : props.theme.colors.grass12};
  width: calc(var(--font-size-normal) + var(--border-width) * 2);
  height: calc(var(--font-size-normal) + var(--border-width) * 2);
  padding: calc(var(--font-size-normal) * 0.2)
    calc(var(--font-size-normal) * 0.1) calc(var(--font-size-normal) * 0.2)
    calc(var(--font-size-normal) * 0.3);
  box-sizing: border-box;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default SwitchIcon;
