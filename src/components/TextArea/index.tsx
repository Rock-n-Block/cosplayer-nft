import { FC } from 'react';

import cn from 'classnames';

import s from './TextArea.module.scss';

interface ITextAreaProps {
  className?: string;
  label: any;
  name: string;
  placeholder: string;
  required?: boolean;
  onChange?: (value: any) => void;
  value?: string;
  editable?: boolean;
  maxLettersCount?: number;
  disabled?: boolean;
}

const TextArea: FC<ITextAreaProps> = ({
  className,
  label,
  onChange,
  value,
  maxLettersCount,
  disabled,
  ...props
}) => {
  const handleChange = (e: any) => {
    if (onChange) {
      if (maxLettersCount) {
        if (e.target.value?.length <= maxLettersCount) {
          onChange(e);
        }
      } else {
        onChange(e);
      }
    }
  };
  return (
    <div className={cn(s.field, className)}>
      {label && <div className={s.label}>{label}</div>}
      <div className={s.wrap}>
        <textarea
          disabled={disabled}
          value={value}
          onChange={handleChange}
          className={s.textarea}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
