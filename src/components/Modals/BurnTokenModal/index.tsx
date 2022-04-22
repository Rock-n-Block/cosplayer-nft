import { FC } from 'react';

import { useDispatch } from 'react-redux';
import { burn } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { Button, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const BurnTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const userId = useShallowSelector(userSelector.getProp('id'));
  const { detailedNft } = useShallowSelector(nftsSelector.getNfts);
  const { [actionTypes.BURN]: burnRequestStatus } = useShallowSelector(uiSelector.getUI);
  const { owners, id: nftId } = detailedNft;

  const handleBurnToken = () => {
    if (Array.isArray(owners)) {
      dispatch(
        burn({
          amount: owners.find((owner) => owner.id === userId)?.quantity || 0,
          id: nftId || 0,
          web3Provider: walletService.Web3(),
        }),
      );
    } else {
      dispatch(burn({ amount: 1, id: nftId || 0, web3Provider: walletService.Web3() }));
    }
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button onClick={handleCloseModal} className="modal-close-btn">
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div>
          <div className="modal-title">Burn token</div>
          <div className="modal-box-description">
            Are you sure to burn this token? This action cannot be undone. Token will be transferred
            to zero address
          </div>
        </div>
        <Button
          color="red"
          className="modal-box-button"
          disabled={burnRequestStatus === RequestStatus.REQUEST}
          onClick={handleBurnToken}
        >
          {burnRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Burn token'
          )}
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default BurnTokenModal;
