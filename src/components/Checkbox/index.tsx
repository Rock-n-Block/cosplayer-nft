import { FC } from 'react';

import cn from 'classnames';

import s from './Checkbox.module.scss';

interface ICheckboxProps {
  name: string;
  id: string;
  className: string;
  checked: boolean;
  disabled: boolean;
  onBlur: any;
  onChange: any;
  text: string;
}

const Checkbox: FC<ICheckboxProps> = ({
  name,
  id,
  className,
  checked,
  disabled,
  text,
  onChange,
  onBlur,
}) => (
  <label htmlFor={id} className={cn(s.checkbox, className)}>
    <input
      id={id}
      name={name}
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
    />
    <span>{text}</span>
  </label>
);

export default Checkbox;
