import { FC, useState } from 'react';

import { Currencies } from 'types';

import PriceSelector from '.';

export default {
  title: 'containers/PriceSelector',
  component: PriceSelector,
};

export const Default: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState<Currencies>('bnb');

  return (
    <PriceSelector
      isOpen={isOpen}
      setOpen={setIsOpen}
      currentCurrency={currentCurrency}
      setCurrentCurrency={setCurrentCurrency}
    />
  );
};
