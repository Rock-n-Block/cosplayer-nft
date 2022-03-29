import React, { FC, memo } from 'react';

import { Dropdown } from '@/components';

import { Currencies } from '@/types';

import { ArrowDownBlueImg } from '@/assets/img/icons';
import { currencies } from './PriceSelector.mock';

import s from './PriceSelector.module.scss';

type PriceSelectorProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentCurrency: string;
  setCurrentCurrency: React.Dispatch<React.SetStateAction<Currencies>>;
};

const PriceSelector: FC<PriceSelectorProps> = ({
  isOpen,
  setOpen,
  currentCurrency,
  setCurrentCurrency,
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
      controlClassname={s.currency}
      optionsClassname={s.currencies_list}
      handleClickOnOption={handleChooseCurrency}
    >
      {currency.icon ? (
        <img src={currency.icon} alt="currency logo" />
      ) : (
        <div className="default-currency-icon" />
      )}
      <div className={s.currency_name}>{currency.label}</div>
      <ArrowDownBlueImg className={isOpen ? s.arrow_up : s.arrow} />
    </Dropdown>
  );
};

export default memo(PriceSelector);
