import { type ComponentProps } from 'react';
import { observer } from 'mobx-react-lite';
import ButtonFactory from './ButtonFactory.tsx';
import Button from './Button';

const DeleteButton = observer(
  ({
    children,
    filled = true,
    ...props
  }: ComponentProps<typeof Button> & { filled?: boolean }) => {
    return (
      <ButtonFactory {...props} $colorPrefix="tomato" $filled={filled}>
        {children}
      </ButtonFactory>
    );
  },
);

export default DeleteButton;
