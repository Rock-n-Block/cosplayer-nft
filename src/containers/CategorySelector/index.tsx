import { FC, useState } from 'react';

import { Dropdown } from 'components';

import { categories } from 'appConstants';

import { ArrowDownBlueImg } from 'assets/img/icons';

import s from './CategorySelector.module.scss';

type CategorySelectorProps = {
  handleChooseCategory: (index: number) => void;
};

const CategorySelector: FC<CategorySelectorProps> = ({ handleChooseCategory }) => {
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
      <ArrowDownBlueImg className={isOpen ? s.arrow_up : s.arrow} />
    </Dropdown>
  );
};

export default CategorySelector;
