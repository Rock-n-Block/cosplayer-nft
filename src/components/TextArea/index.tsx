import { FC, SyntheticEvent } from 'react';

import cn from 'classnames';

import s from './TextArea.module.scss';

interface ITextAreaProps {
  className?: string;
  label: any;
  name: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  onChange?: (value: any) => void;
  onBlur?: (e: SyntheticEvent) => void;
  value?: string;
  editable?: boolean;
  maxLettersCount?: number;
  disabled?: boolean;
}

const TextArea: FC<ITextAreaProps> = ({
  className,
  label,
  onChange,
  onBlur,
  value,
  error,
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
      {label && <span className={s.label}>{label}</span>}
      {error && <span className={s.error}>{error}</span>}
      <div className={s.wrap}>
        <textarea
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className={s.textarea}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextArea;
