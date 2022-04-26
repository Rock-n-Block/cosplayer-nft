import { ChangeEvent, FC, useState } from 'react';

import { useDispatch } from 'react-redux';
import modalsSelector from 'store/modals/selectors';
import { bid } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js/bignumber';
import { PriceSelector } from 'containers';

import { Button, FormInput, Modal, Spinner } from 'components';

import { useModal, useShallowSelector } from 'hooks';
import { useWalletConnectorContext } from 'services';
import { Currencies, RequestStatus, StoreModalProps } from 'types';

import { CloseImg } from 'assets/img/icons';

const PlaceBidModal: FC<StoreModalProps> = ({ id }) => {
  const [isVisibleModal, handleCloseModal] = useModal(id);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { balance, rates } = useShallowSelector(userSelector.getUser);
  const { [actionTypes.BID]: bidRequestStatus } = useShallowSelector(uiSelector.getUI);
  const {
    currency,
    tokenId,
    amount: minBid,
  } = useShallowSelector(modalsSelector.getProp('modalState')).props;
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const currentBalance = new BigNumber(balance[currency === 'bnb' ? 'bnb' : 'rec']).toString(10);
  const currentCurrency: Currencies = currency === 'bnb' ? 'bnb' : 'rec';

  const handleChangeBid = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < Number(minBid || 0)) {
      setError(`Bid can't be lower then ${minBid}`);
    } else if (+e.target.value > +currentBalance) {
      setError("Bid can't be greater then your balance");
    } else setError('');
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (tokenId) {
      dispatch(
        bid({
          id: tokenId,
          amount: +amount,
          currency: currentCurrency,
          web3Provider: walletService.Web3(),
        }),
      );
    }
  };

  return (
    <Modal onClose={handleCloseModal} visible={isVisibleModal}>
      <Button className="modal-close-btn" onClick={handleCloseModal}>
        <CloseImg />
      </Button>
      <div className="modal-box">
        <div className="modal-box-header">
          <div className="modal-title">Place a Bid</div>
          <div className="modal-box-description modal-box-description-grey">
            You must bid at least {minBid} {currentCurrency.toUpperCase()}
          </div>
        </div>
        <FormInput
          color="white"
          type="number"
          positiveOnly
          placeholder="Enter bid"
          value={amount}
          onChange={handleChangeBid}
          error={error}
          suffix={
            <div className="modal-suffix">
              <PriceSelector
                isStatic
                isOpen={false}
                setOpen={() => {}}
                currentCurrency={currentCurrency}
                setCurrentCurrency={() => {}}
              />
              <span>
                {new BigNumber(rates[currentCurrency]).times(amount || 0).toFixed(3, 1)}&nbsp;$
              </span>
            </div>
          }
        />
        <div className="modal-box-option">
          <div className="modal-box-option-name">Your balance:</div>
          <div className="modal-box-option-value">
            {currentBalance}&nbsp;{currency?.toUpperCase() || 'bnb'}
          </div>
        </div>
        <div className="modal-box-option">
          <div className="modal-box-option-name">You will pay:</div>
          <div className="modal-box-option-value">
            {amount || 0}&nbsp;
            {currentCurrency.toUpperCase()}
          </div>
        </div>
        <Button
          className="modal-box-button"
          color="blue"
          disabled={!!error || !amount || bidRequestStatus === RequestStatus.REQUEST}
          onClick={handleSubmit}
        >
          {bidRequestStatus === RequestStatus.REQUEST ? (
            <Spinner color="blue" size="sm" />
          ) : (
            'Place a Bid'
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default PlaceBidModal;
