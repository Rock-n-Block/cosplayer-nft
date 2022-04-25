import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { endAuction } from 'store/nfts/actions';
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

const AcceptBidModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { fee } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.END_AUCTION]: endAuctionRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );
  const { highestBid, id: tokenId } = useShallowSelector(nftsSelector.getProp('detailedNft'));

  const handleSubmit = () => {
    if (tokenId) {
      dispatch(endAuction({ id: tokenId, web3Provider: walletService.Web3() }));
    }
  };

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-box-header">
          <div className="modal-title">Accept Bid</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Highest bid:</div>
          <div className="modal-box-option-value">
            {new BigNumber(highestBid?.amount || 0).toString(10)}&nbsp;
            {highestBid?.currency?.symbol?.toUpperCase()}
          </div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Bidder:</div>
          <div className="modal-box-option-value">{highestBid?.bidder}</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">Service fee:</div>
          <div className="modal-box-option-value">{fee}%</div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will receive:</div>
          <div className="modal-box-option-value">
            {new BigNumber(highestBid?.amount || 0).times(1 - fee / 100).toString(10)}
            &nbsp;
            {highestBid?.currency?.symbol?.toUpperCase()}
          </div>
        </div>
        <Button
          className="modal-box-button"
          disabled={endAuctionRequestStatus === RequestStatus.REQUEST}
          color="blue"
          onClick={handleSubmit}
        >
          {endAuctionRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Accept bid'
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default AcceptBidModal;
