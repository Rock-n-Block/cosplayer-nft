import { FC, PropsWithChildren, RefObject, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { ButtonColors } from 'types';

import s from './Button.module.scss';

export interface IButton {
  color?: ButtonColors;
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  onDoubleClick?: (event: never) => void;
  onClick?: (event: never) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onMouseLeave?: (event: never) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
  href?: string;
  btnRef?: RefObject<HTMLButtonElement>;
}

const Button: FC<PropsWithChildren<IButton>> = ({
  color = 'default',
  size = 'lg',
  onDoubleClick = () => {},
  onClick = () => {},
  className,
  type = 'button',
  children,
  disabled,
  href,
  btnRef,
  onMouseLeave,
  onMouseOver = () => {},
  ...props
}) => {
  if (href) {
    return (
      <Link
        to={href}
        className={cn(className, s.button, s[color], {
          [s.disabled]: disabled || color === 'disabled',
        })}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      {...props}
      ref={btnRef}
      type={type === 'submit' ? 'submit' : 'button'}
      className={cn(s.button, s[color], s[size], className, {
        [s.disabled]: disabled || color === 'disabled',
      })}
      onDoubleClick={onDoubleClick}
      onClick={!disabled ? onClick : () => {}}
      disabled={disabled}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseOver}
    >
      {children}
    </button>
  );
};

export default Button;
