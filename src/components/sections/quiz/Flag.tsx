import { observer } from 'mobx-react-lite';
import { Result } from '../../../interfaces/data.ts';
import styled, { css } from 'styled-components';
import usePreloadImage from '../../../hooks/usePreloadImage.ts';
import { ReactNode } from 'react';

const StyledFlag = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: var(--padding-l);
  box-sizing: border-box;
  border-radius: var(--radius-l);
  background: ${(props) => props.theme.colors.color3};

  @media screen and (min-width: 701px) {
    grid-area: flag;
  }

  &:not(:has(figcaption)) {
    align-items: center;
    justify-content: center;
    padding: 0;
    aspect-ratio: 3/2;

    @media screen and (min-width: 701px) {
      aspect-ratio: unset;
    }
  }

  & > figcaption {
    display: flex;
    flex-direction: column;

    & > p {
      font-size: calc(var(--font-size) * 0.8);

      @media screen and (max-width: 500px) {
        & {
          font-size: var(--font-size);
        }
      }

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
  width: 100%;
  aspect-ratio: 3/2;
  background: ${(props) => props.theme.colors.color2};
  border-radius: var(--radius-m);
  filter: drop-shadow(
      ${(props) => props.theme.colors.color4} 0px 0px var(--padding-s)
    )
    ${(props) => props.theme.name === 'dark' && css`opacity(0.9);`};

  &:not(:only-child) {
    margin-bottom: var(--padding-m);

    @media screen and (max-width: 500px) {
      aspect-ratio: auto;
    }
  }

  @media screen and (min-width: 701px) {
    aspect-ratio: auto;
  }

  & img {
    width: 100%;
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
                  data-testid="flag"
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
