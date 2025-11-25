/* eslint-disable mobx/missing-observer */
import styled from 'styled-components';

const StyledFallback = styled.div`
  width: 100%;
  text-align: center;
`;

const Fallback = () => <StyledFallback>Loading...</StyledFallback>;

export default Fallback;
