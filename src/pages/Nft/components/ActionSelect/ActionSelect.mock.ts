import { IDropdownItem } from 'types';

import {
  BurnImg,
  ChangePriceImg,
  RemoveImg,
  ReportImg,
  TransferImg,
} from 'assets/img/icons/actions';

export const actions: IDropdownItem[] = [
  {
    icon: ChangePriceImg,
    label: 'Change price',
    value: 'change-price',
  },
  {
    icon: TransferImg,
    label: 'Transfer token',
    value: 'transfer',
  },
  {
    icon: RemoveImg,
    label: 'Remove from sale',
    value: 'remove',
  },
  {
    icon: BurnImg,
    label: 'Burn token',
    value: 'burn',
  },
  {
    icon: ReportImg,
    label: 'Report',
    value: 'report',
  },
];
