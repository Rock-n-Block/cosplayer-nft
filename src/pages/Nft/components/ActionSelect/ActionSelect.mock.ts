import { IDropdownItem } from 'types';

import { ChangePriceImg, RemoveImg, ReportImg, TransferImg } from 'assets/img/icons/actions';

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
    icon: ReportImg,
    label: 'Report',
    value: 'report',
  },
];
