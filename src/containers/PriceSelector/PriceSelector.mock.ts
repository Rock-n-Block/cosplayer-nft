import { IDropdownCurrency } from 'types';

import { BnbImg, RecImg } from 'assets/img/icons';

export const currencies: IDropdownCurrency[] = [
  {
    value: 'bnb',
    icon: BnbImg,
    label: 'BNB',
  },
  {
    value: 'rec',
    icon: RecImg,
    label: 'REC',
  },
];
