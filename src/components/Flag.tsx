import { observer } from 'mobx-react-lite';
import { Result } from '../interfaces/data.ts';
import styled, { css } from 'styled-components';
import usePreloadImage from '../hooks/usePreloadImage.ts';
import { ReactNode } from 'react';

const StyledFlag = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: var(--padding-m);
  width: 100%;
  height: 100%;
  padding: var(--padding-l);
  box-sizing: border-box;
  border-radius: var(--radius-l);
  background: ${(props) => props.theme.colors.color3};

  &:not(:has(figcaption)) {
    padding: 0;
  }

  & > figcaption {
    display: flex;
    flex-direction: column;

    & > p {
      font-size: var(--font-size-s);

      &:not(:last-child) {
        margin-bottom: var(--padding-s);
      }
    }
  }
`;

const PictureWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3/2;
  background: ${(props) => props.theme.colors.color2};
  border-radius: var(--radius-m);
  filter: drop-shadow(
      ${(props) => props.theme.colors.color4} 0px 0px var(--padding-s)
    )
    ${(props) => props.theme.name === 'dark' && css`opacity(0.9);`};

  & img {
    --max-width: calc(var(--card-max-width) - 2 * var(--padding-l));
    width: 100%;
    max-width: var(--max-width);
    max-height: calc(var(--max-width) / 3 * 2);
    border-radius: var(--radius-m);
    box-sizing: border-box;
  }
`;

const Flag = observer(
  ({ info, children }: { info: Result; children?: ReactNode }) => {
    const [state] = usePreloadImage(info);

    return (
      <StyledFlag>
        {state === 'loading' && <p>Loading flag...</p>}
        {state === 'error' && <p>An error occurred</p>}
        {state === 'done' && (
          <>
            <PictureWrapper>
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
            </PictureWrapper>
            {children && <figcaption>{children}</figcaption>}
          </>
        )}
      </StyledFlag>
    );
  },
);

export default Flag;
