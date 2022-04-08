import React, { FC } from 'react';

import cn from 'classnames';

import s from './Checker.module.scss';

export interface IChecker {
  isChecked: boolean;
  disabled: boolean;
  handleClick: () => void;
}

const Checker: FC<IChecker> = ({ isChecked, disabled, handleClick }) => {
  return (
    <div
      className={cn(s.checker, isChecked && s.checked)}
      role="button"
      tabIndex={0}
      onKeyPress={disabled ? () => {} : handleClick}
      onClick={disabled ? () => {} : handleClick}
    >
      <div className={cn(s.dot, isChecked ? s.dot_right : s.dot_left)} />
    </div>
  );
};

export default Checker;
