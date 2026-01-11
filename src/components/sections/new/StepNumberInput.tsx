import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Plus, Minus } from '@phosphor-icons/react';
import { useWatch, useFormContext } from 'react-hook-form';
import { type ReactNode } from 'react';
import VariantButton from '../../generic/VariantButton.tsx';

const StyledWithButtons = styled.div`
  display: flex;
  justify-content: center;
`;

const NumberInput = styled.input`
  width: 40px;
  margin: 0 5px;
  border: none;
  border-radius: var(--radius-m);
  color: inherit;
  background-color: transparent;
  text-align: center;
`;

const WithButtons = observer(
  ({
    children,
    changeValue,
    minValue,
    maxValue,
  }: {
    children: ReactNode;
    changeValue: (arg: '+' | '-') => void;
    minValue: number;
    maxValue: number;
  }) => {
    const { control } = useFormContext();
    const questionsQuantity = useWatch({ control, name: 'questionsQuantity' });
    const isMin = questionsQuantity <= minValue || isNaN(questionsQuantity);
    const isMax = questionsQuantity >= maxValue || isNaN(questionsQuantity);

    return (
      <StyledWithButtons>
        <VariantButton
          type="button"
          onClick={() => changeValue('-')}
          disabled={isMin}
          data-testid="questions-quantity-decrement"
        >
          <Minus weight="regular" />
          <span className="visually-hidden">Decrease quiz&#39;s length</span>
        </VariantButton>
        {children}
        <VariantButton
          type="button"
          onClick={() => changeValue('+')}
          disabled={isMax}
          data-testid="questions-quantity-increment"
        >
          <Plus weight="regular" />
          <span className="visually-hidden">Increase quiz&#39;s length</span>
        </VariantButton>
      </StyledWithButtons>
    );
  },
);

const StepNumberInput = observer(
  ({
    changeValue,
    minValue,
    maxValue,
  }: {
    changeValue: (arg: '+' | '-') => void;
    minValue: number;
    maxValue: number;
  }) => {
    const { register } = useFormContext();

    return (
      <WithButtons
        changeValue={changeValue}
        minValue={minValue}
        maxValue={maxValue}
      >
        <NumberInput
          id="questionsQuantity"
          type="text"
          autoComplete="off"
          data-testid="questions-quantity-input"
          {...register('questionsQuantity', {
            required: 'This field is required',
            valueAsNumber: true,
            validate: (value) => {
              const num = Number(value);
              if (isNaN(num)) return 'Must be a number';
              if (num < minValue) return `Minimum is ${minValue}`;
              if (num > maxValue) return `Maximum is ${maxValue}`;
              return true;
            },
          })}
        />
      </WithButtons>
    );
  },
);

export default StepNumberInput;
