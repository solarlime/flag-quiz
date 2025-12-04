import { observer } from 'mobx-react-lite';
import ButtonFactory from './ButtonFactory.tsx';
import { type ComponentProps } from 'react';
import Button from './Button.tsx';

const CoreButton = observer(
  ({
    children,
    filled = true,
    ...props
  }: ComponentProps<typeof Button> & { filled?: boolean }) => {
    return (
      <ButtonFactory {...props} $colorPrefix="grass" $filled={filled}>
        {children}
      </ButtonFactory>
    );
  },
);

export default CoreButton;
