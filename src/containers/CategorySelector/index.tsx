import React, { FC, SyntheticEvent, useState } from 'react';

import { Dropdown, FormInput } from 'components';

import { categories } from 'appConstants';

import { ArrowDownBlueImg } from 'assets/img/icons';

import s from './CategorySelector.module.scss';

type CategorySelectorProps = {
  handleChooseCategory: (index: number) => void;
  name: string;
  value: string;
  error: string;
  onChange: (value: any) => void;
  onBlur: (e: SyntheticEvent) => void;
  disabled: boolean;
};

const CategorySelector: FC<CategorySelectorProps> = ({
  handleChooseCategory,
  name,
  value,
  error,
  onChange,
  onBlur,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSetCategory = (index: number) => {
    handleChooseCategory(index);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isVisible={isOpen}
      setVisible={setIsOpen}
      options={categories}
      classname={s.dropdown}
      controlClassname={s.control}
      optionsClassname={s.options}
      handleClickOnOption={handleSetCategory}
    >
      <FormInput
        name={name}
        type="text"
        label="Select category"
        color="grey"
        placeholder="Select Category"
        description="Add category on your post and make users easy to find your post."
        value={value}
        suffix={<ArrowDownBlueImg className={isOpen ? s.arrow_up : s.arrow_down} />}
        onChange={onChange}
        disabled={disabled}
        error={error}
        onBlur={onBlur}
      />
    </Dropdown>
  );
};

export default CategorySelector;
