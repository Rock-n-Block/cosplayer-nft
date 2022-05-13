import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import nftsSelector from 'store/nfts/selectors';
import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { Dropdown } from 'components';

import { useShallowSelector } from 'hooks';

import { actions } from './ActionSelect.mock';

import { MoreImg } from 'assets/img/icons';

import s from './ActionSelect.module.scss';

export const ActionSelect: FC = () => {
  const [isOpenActions, setOpenActions] = useState(false);
  const {
    standart,
    endAuction,
    bids,
    owners,
    sellers,
    isSelling,
    selling,
    isAucSelling,
    ownerAuction,
  } = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const userId = useShallowSelector(userSelector.getProp('id'));
  const dispatch = useDispatch();

  const isEndedAuc = Date.now() - new Date(endAuction || '').getTime() > 0;

  const filterActions = () => {
    if (standart === 'ERC721' && !Array.isArray(owners) && owners?.id === userId) {
      if (selling) {
        if (isAucSelling && !isEndedAuc && bids?.length) {
          return actions.filter((action) => action.value === 'report');
        }
        return actions;
      }
      return actions.filter((action) => action.value !== 'remove');
    }
    if (
      standart === 'ERC1155' &&
      Array.isArray(owners) &&
      owners.find((owner) => owner.id === userId)
    ) {
      if (isSelling && sellers?.find((seller) => seller.id === userId)) {
        return actions;
      }
      if (isAucSelling && ownerAuction?.find((owner) => owner.id === userId)) {
        return actions;
      }
      return actions.filter((action) => action.value !== 'remove');
    }
    return actions.filter((action) => action.value === 'report');
  };

  const handleAction = (index: number) => {
    switch (filterActions()[index].value) {
      case 'change-price': {
        dispatch(setActiveModal({ activeModal: 'ChangePrice' }));
        break;
      }
      case 'transfer': {
        dispatch(setActiveModal({ activeModal: 'TransferToken' }));
        break;
      }
      case 'remove': {
        dispatch(setActiveModal({ activeModal: 'RemoveToken' }));
        break;
      }
      case 'report': {
        dispatch(setActiveModal({ activeModal: 'Report' }));
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Dropdown
      isVisible={isOpenActions}
      setVisible={setOpenActions}
      options={filterActions()}
      classname={s.actions}
      controlClassname={cn(s.actions_control, s.hover)}
      optionsClassname={s.actions_options}
      handleClickOnOption={handleAction}
    >
      <MoreImg className={isOpenActions ? s.active : ''} />
    </Dropdown>
  );
};
