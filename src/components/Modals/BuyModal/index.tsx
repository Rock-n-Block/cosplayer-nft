import { FC } from 'react';

import { useDispatch } from 'react-redux';
import modalSelector from 'store/modals/selectors';
import { buy } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js/bignumber';

import { Button, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const BuyModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { balance } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.BUY]: buyRequestStatus } = useShallowSelector(uiSelector.getUI);
  const { tokenId, sellerId, quantity, currency, amount } = useShallowSelector(
    modalSelector.getProp('modalState'),
  ).props;
  const { detailedNft, fee } = useShallowSelector(nftsSelector.getNfts);
  const currentBalance = currency === 'bnb' ? balance.bnb : balance.rec;

  const finalPrice = new BigNumber(amount)
    .times(quantity)
    .times(new BigNumber(fee).div(100).plus(1))
    .toString(10);

  const handleSubmit = () => {
    dispatch(
      buy(
        detailedNft.standart === 'ERC1155'
          ? {
              id: tokenId,
              currency,
              amount,
              tokenAmount: quantity,
              sellerId,
              web3Provider: walletService.Web3(),
            }
          : {
              id: tokenId,
              currency,
              amount,
              tokenAmount: '0',
              sellerId,
              web3Provider: walletService.Web3(),
            },
      ),
    );
  };

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-box-header">
          <div className="modal-title">Buy token</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Your balance:</div>
          <div className="modal-box-option-value">
            {currentBalance}&nbsp;{currency.toUpperCase()}
          </div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Service fee:</div>
          <div className="modal-box-option-value">{fee}%</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will pay:</div>
          <div className="modal-box-option-value">
            {finalPrice}
            &nbsp;
            {currency.toUpperCase()}
          </div>
        </div>
        <Button
          className="modal-box-button"
          disabled={
            buyRequestStatus === RequestStatus.REQUEST ||
            new BigNumber(finalPrice).isGreaterThanOrEqualTo(currentBalance)
          }
          color="blue"
          onClick={handleSubmit}
        >
          {buyRequestStatus === RequestStatus.REQUEST ? <Spinner color="blue" size="sm" /> : 'Buy'}
        </Button>
      </div>
    </Modal>
  );
};

export default BuyModal;
