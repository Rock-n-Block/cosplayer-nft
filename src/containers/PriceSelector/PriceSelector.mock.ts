import { IDropdownCurrency } from 'types';

import { BnbImg } from 'assets/img/icons';

export const currencies: IDropdownCurrency[] = [
  {
    value: 'bnb',
    icon: BnbImg,
    label: 'BNB',
  },
  {
    value: 'cosnft',
    icon: '',
    label: 'COSNFT',
  },
  {
    value: 'rec',
    icon: '',
    label: 'REC',
  },
];
