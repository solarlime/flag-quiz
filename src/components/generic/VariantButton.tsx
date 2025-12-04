import styled from 'styled-components';
import CoreButton from './CoreButton.tsx';

const VariantButton = styled(CoreButton).attrs({
  filled: false,
})`
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.5s ease-out,
    visibility 0.5s ease-out;
`;

export default VariantButton;
