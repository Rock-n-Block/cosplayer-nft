import { FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import { transfer } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { Button, FormInput, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const TransferTokenModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { detailedNft } = useShallowSelector(nftsSelector.getNfts);
  const userId = useShallowSelector(userSelector.getProp('id'));
  const { [actionTypes.TRANSFER]: transferRequestStatus } = useShallowSelector(uiSelector.getUI);

  const { owners, id: tokenId } = detailedNft;

  const maxAmount =
    owners && !Array.isArray(owners)
      ? owners.quantity
      : owners?.find((owner) => owner.id === userId)?.quantity || 1;

  const handleTransferToken = () => {
    if (tokenId) {
      dispatch(transfer({ id: tokenId, amount, address, web3Provider: walletService.Web3() }));
    }
  };

  return (
    <Modal visible={isVisibleModal} onClose={handleCloseModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-title">Transfer token</div>
        <div className="modal-text">You can transfer tokens from your address to another</div>
        <FormInput
          color="grey"
          type="text"
          placeholder="Paste address"
          value={address}
          label="Receiver address"
          onChange={(e) => setAddress(e.target.value)}
        />
        {maxAmount > 1 && (
          <FormInput
            color="grey"
            type="number"
            placeholder="Enter amount"
            value={amount.toString()}
            max={maxAmount}
            label="Amount of tokens"
            onChange={(e) => setAmount(e.target.value)}
          />
        )}
        <Button
          color="blue"
          className="modal-box-button"
          disabled={!address || !amount || transferRequestStatus === RequestStatus.REQUEST}
          onClick={handleTransferToken}
        >
          {transferRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Continue'
          )}
        </Button>
        <Button color="bordered" className="modal-box-button" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default TransferTokenModal;
