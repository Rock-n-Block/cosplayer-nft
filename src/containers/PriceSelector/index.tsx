import React, { FC, Fragment } from 'react';

import cn from 'classnames';

import { Dropdown } from 'components';

import { Currencies } from 'types';

import { currencies } from './PriceSelector.mock';

import { ArrowDownBlueImg } from 'assets/img/icons';

import s from './PriceSelector.module.scss';

type PriceSelectorProps = {
  isStatic?: boolean;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentCurrency: string;
  setCurrentCurrency: (currency: Currencies) => void;
};

const PriceSelector: FC<PriceSelectorProps> = ({
  isOpen,
  setOpen,
  currentCurrency,
  setCurrentCurrency,
  isStatic,
}) => {
  const currency = currencies.find((item) => item.value === currentCurrency) || currencies[0];

  const handleChooseCurrency = (index: number) => {
    setCurrentCurrency(currencies[index].value);
    setOpen(false);
  };

  return (
    <Dropdown
      isVisible={isOpen}
      setVisible={setOpen}
      options={currencies}
      classname={s.currencies}
      controlClassname={cn(s.currency, isStatic && s.static)}
      optionsClassname={s.currencies_list}
      handleClickOnOption={handleChooseCurrency}
    >
      <img src={currency.icon} alt="currency logo" />
      <div className={s.currency_name}>{currency.label}</div>
      {isStatic ? Fragment : <ArrowDownBlueImg className={isOpen ? s.arrow_up : s.arrow} />}
    </Dropdown>
  );
};

export default PriceSelector;
