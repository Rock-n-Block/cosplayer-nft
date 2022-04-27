import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import modalSelector from 'store/modals/selectors';
import { buy } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js/bignumber';

import { Button, FormInput, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const BuyModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const [tokenAmount, setTokenAmount] = useState('1');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { balance } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.BUY]: buyRequestStatus } = useShallowSelector(uiSelector.getUI);
  const { tokenId, sellerId, quantity, currency, amount } = useShallowSelector(
    modalSelector.getProp('modalState'),
  ).props;
  const { detailedNft } = useShallowSelector(nftsSelector.getNfts);
  const currentBalance = currency === 'bnb' ? balance.bnb : balance.rec;

  const finalPrice = new BigNumber(amount || 0).times(tokenAmount).toString(10);

  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1) {
      setError('Quantity cannot be lower then 1');
    } else if (+e.target.value > Number(quantity)) {
      setError(`Quantity cannot be greater then ${quantity}`);
    } else if (
      new BigNumber(amount || 0).times(e.target.value).isGreaterThanOrEqualTo(currentBalance)
    ) {
      setError('Amount cannot be greater then your balance');
    } else setError('');
    setTokenAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (tokenId && sellerId && quantity && currency && amount) {
      dispatch(
        buy(
          detailedNft.standart === 'ERC1155'
            ? {
                id: tokenId,
                currency,
                amount,
                tokenAmount,
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
    }
  };

  useEffect(() => {
    if (detailedNft.standart === 'ERC721') setTokenAmount('1');
  }, [detailedNft.standart]);

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-box-header">
          <div className="modal-title">Buy token</div>
        </div>
        {detailedNft.standart === 'ERC1155' && (
          <FormInput
            type="number"
            label="Token amount"
            placeholder="Enter amount of token to buy"
            integer
            max={Number(quantity)}
            value={tokenAmount.toString()}
            error={error}
            onChange={handleChangeAmount}
          />
        )}
        <div className="modal-box-option">
          <div className="modal-box-option-name">Your balance:</div>
          <div className="modal-box-option-value">
            {currentBalance}&nbsp;{currency?.toUpperCase() || 'bnb'}
          </div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will pay:</div>
          <div className="modal-box-option-value">
            {finalPrice}
            &nbsp;
            {currency?.toUpperCase() || 'bnb'}
          </div>
        </div>
        <Button
          className="modal-box-button"
          disabled={buyRequestStatus === RequestStatus.REQUEST || !!error}
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
