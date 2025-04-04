import { observer } from 'mobx-react-lite';
import { Result } from '../interfaces/data.ts';
import styled, { css } from 'styled-components';
import usePreloadImage from '../hooks/usePreloadImage.ts';

const StyledFlag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 3/2;

  & img {
    --max-width: calc(var(--card-max-width) - 2 * var(--padding-l));
    width: 100%;
    max-width: var(--max-width);
    max-height: calc(var(--max-width) / 3 * 2);
    border-radius: var(--radius-m);
    box-sizing: border-box;
    filter: drop-shadow(
        ${(props) => props.theme.colors.color4} 0px 0px var(--padding-s)
      )
      ${(props) => props.theme.name === 'dark' && css`opacity(0.9);`};
  }
`;

const Flag = observer(({ info }: { info: Result }) => {
  const [state] = usePreloadImage(info);

  return (
    <StyledFlag>
      {state === 'loading' && <p>Loading flag...</p>}
      {state === 'error' && <p>An error occurred</p>}
      {state === 'done' && (
        <picture>
          <source
            type="image/webp"
            srcSet={`https://flagcdn.com/w640/${info?.countryCodeAlpha2}.webp,
      https://flagcdn.com/w1280/${info?.countryCodeAlpha2}.webp 2x`}
          />
          <source
            type="image/png"
            srcSet={`https://flagcdn.com/w640/${info?.countryCodeAlpha2}.png,
      https://flagcdn.com/w1280/${info?.countryCodeAlpha2}.png 2x`}
          />
          <img
            src={`https://flagcdn.com/w640/${info?.countryCodeAlpha2}.png`}
            alt="Guess it!"
          />
        </picture>
      )}
    </StyledFlag>
  );
});

export default Flag;
