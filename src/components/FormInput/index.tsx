import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';

import BigNumber from 'bignumber.js/bignumber';
import cn from 'classnames';

import s from './FormInput.module.scss';

interface Props {
  className?: string;
  color?: 'grey' | 'white' | 'bordered';
  note?: string;
  description?: string;
  label?: string | JSX.Element;
  name?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
  suffix?: any;
  suffixClassName?: string;
  prefixClassName?: string;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  value?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  integer?: boolean;
  positiveOnly?: boolean;
  moreThanZero?: boolean;
  max?: number;
  min?: number;
}

const FormInput: FC<Props> = ({
  integer = false,
  positiveOnly = false,
  moreThanZero = false,
  className,
  color = 'grey',
  note,
  description,
  label,
  suffix,
  onChange,
  value,
  suffixClassName,
  name,
  disabled,
  prefix,
  prefixClassName,
  error,
  icon,
  max,
  min,
  type = 'text',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elWidth, setElWidth] = useState(0);

  const prefixElement = (
    <div ref={ref} className={cn(s.prefix, prefixClassName)}>
      {prefix}
    </div>
  );

  const getRegex = () => {
    if (integer) {
      return positiveOnly ? /^[+]?[1-9]\d*$/ : /^[-+]?[1-9]\d*$/;
    }
    if (moreThanZero) {
      return positiveOnly ? /^[+]?[0-9]\d*$/ : /^[-+]?[0-9]\d*$/;
    }
    return positiveOnly ? /^[+]?([.]\d+|\d+[.]?\d*)$/ : /^[-+]?([.]\d+|\d+[.]?\d*)$/;
  };

  const checkMin = (comparingValue: string) => {
    const arrayedComparingValue = Array.from(String(comparingValue), Number);
    const arrayedMin = Array.from(String(min), Number);
    if (new BigNumber(min ?? 0).isLessThanOrEqualTo(comparingValue)) return true;
    for (let i = 0; i < arrayedComparingValue.length; i += 1) {
      if (
        !(
          (
            new BigNumber(arrayedMin[i]).isLessThanOrEqualTo(
              new BigNumber(arrayedComparingValue[i]),
            ) || // every symbol should be more or equal to min value
            (Number.isNaN(arrayedMin[i]) && Number.isNaN(arrayedComparingValue[i])) || // '.' elements
            (arrayedComparingValue[i] !== undefined && arrayedMin[i] === undefined)
          ) // if arrayedComparingValue longer than arrayedMin
        )
      ) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const reg = getRegex();
    const inputValue = e.target.value;
    if (onChange) {
      if (
        (!Number.isNaN(inputValue) && reg.test(inputValue)) ||
        (!positiveOnly && inputValue === '-')
      ) {
        if (max && min) {
          if (
            checkMin(inputValue) &&
            (new BigNumber(inputValue).isLessThan(new BigNumber(max)) ||
              new BigNumber(inputValue).isEqualTo(new BigNumber(max)))
          )
            onChange(e);
        } else if (max) {
          if (
            new BigNumber(inputValue).isLessThan(new BigNumber(max)) ||
            new BigNumber(inputValue).isEqualTo(new BigNumber(max))
          )
            onChange(e);
        } else if (min) {
          if (checkMin(inputValue)) onChange(e);
        } else onChange(e);
      }
      if (inputValue === '') onChange(e);
    }
  };

  const handleInputChange = type === 'number' ? handleChange : onChange;

  useEffect(() => {
    if (ref.current && prefix) {
      setElWidth(ref.current.offsetWidth);
    }
  }, [prefix]);

  return (
    <div className={cn(s.field, className)}>
      {label && <div className={s.label}>{label}</div>}
      {error ? (
        <div className="text-red">{error}</div>
      ) : (
        note && <div className={s.note}>{note}</div>
      )}
      <div className={cn(s.wrap, s[color])}>
        {prefixElement}
        <input
          type={type}
          id={name}
          value={value}
          className={cn(s.input, { [s.error]: !!error, [s.withIcon]: icon })}
          onChange={handleInputChange}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          {...props}
          style={
            elWidth
              ? { paddingLeft: `${elWidth + 4}px`, paddingRight: suffix ? '74px' : '' }
              : { paddingRight: suffix ? '74px' : '' }
          }
        />
        <div className={cn(s.suffix, suffixClassName)}>{suffix}</div>
      </div>
      {description && <div className={s.description}>{description}</div>}
    </div>
  );
};

export default FormInput;
