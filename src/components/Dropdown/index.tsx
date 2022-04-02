import React, { FC } from 'react';

import cn from 'classnames';

import { Button } from '../index';

import { useClickOutside } from 'hooks';
import { IDropdownItem } from 'types';

import s from './Dropdown.module.scss';

export interface DropdownProps {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  options: IDropdownItem[];
  classname: string;
  controlClassname: string;
  optionsClassname: string;
  handleClickOnOption: (index: number) => void;
}

const Dropdown: FC<DropdownProps> = ({
  isVisible,
  setVisible,
  options,
  classname,
  controlClassname,
  optionsClassname,
  handleClickOnOption,
  children,
}) => {
  const { ref } = useClickOutside(isVisible, setVisible);

  const handleOpenSort = () => {
    setVisible(true);
  };

  const handleCloseSort = () => {
    setVisible(false);
  };

  return (
    <div className={cn(classname, s.dropdown)} ref={ref}>
      <Button
        color="white"
        className={controlClassname}
        onClick={isVisible ? handleCloseSort : handleOpenSort}
      >
        {children}
      </Button>
      {isVisible && (
        <div className={cn(s.options, optionsClassname)}>
          {options.map((option, index) => (
            <Button
              className={s.option}
              onClick={() => handleClickOnOption(index)}
              key={option.value}
            >
              {option.icon ? (
                <img className={s.option_icon} src={option.icon} alt={option.value} />
              ) : (
                <div className={cn('default-currency-icon', s.option_icon)} />
              )}
              <div className={s.option_value}>{option.label}</div>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
