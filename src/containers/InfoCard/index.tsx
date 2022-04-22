import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setActiveModal } from 'store/modals/reducer';
import userSelector from 'store/user/selectors';

import moment from 'moment';

import { Button } from 'components';

import { useShallowSelector } from 'hooks';
import { Currencies } from 'types';

import s from './InfoCard.module.scss';

export interface InfoCardProps {
  type: 'Purchased' | 'offered' | 'auctioned' | 'Owned' | '';
  avatar: string;
  id: string;
  name: string;
  quantity: number | string;
  price: number | string;
  currency: Currencies;
  date: Date;
}

const InfoCard: FC<InfoCardProps> = ({
  type,
  avatar,
  id,
  price,
  date,
  name,
  quantity,
  currency,
}) => {
  const [endpoint, setEndpoint] = useState(Math.floor((date.getTime() - Date.now()) / 1000));
  const dispatch = useDispatch();
  const { id: tokenId } = useParams();
  const yourId = useShallowSelector(userSelector.getProp('id'));

  const days = Math.floor(endpoint / (60 * 60 * 24));
  const hours = Math.floor((endpoint / (60 * 60)) % 24);
  const minutes = Math.floor((endpoint / 60) % 60);
  const seconds = endpoint % 60;

  const handleBuyOrBid = () => {
    if (tokenId) {
      if (type === 'auctioned') {
        dispatch(
          setActiveModal({
            activeModal: 'PlaceBid',
            props: { tokenId, amount: price, currency, quantity, sellerId: '' },
          }),
        );
      } else if (type === 'offered') {
        dispatch(
          setActiveModal({
            activeModal: 'Buy',
            props: { tokenId, amount: price, currency, quantity, sellerId: id },
          }),
        );
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setEndpoint((prev) => prev - 1), 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={s.info_card}>
      <div className={s.content}>
        <Button className={s.avatar} href={`/profile/${id}`}>
          <img src={avatar} alt={`${name} avatar`} />
        </Button>
        <div className={s.action}>
          <span className={s.action_description}>
            {type !== 'Owned' && price > 0 && currency && (
              <div className={s.text_blue}>
                {price}&nbsp;{currency.toUpperCase()}
                {quantity > 1 && ` (${quantity})`}&nbsp;
              </div>
            )}
            {type}&nbsp;by&nbsp;
            <div className={s.text_black}>
              {name}&nbsp;
              {type === 'Owned' && `(${quantity})`}
            </div>
          </span>
          <span className={s.action_time}>
            {type === 'auctioned' && endpoint > 0 && (
              <>
                ends in&nbsp;<div className={s.text_black}>{days}</div>&nbsp;day
                {days !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{hours}</div>&nbsp;hour
                {hours !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{minutes}</div>&nbsp;min
                {minutes !== 1 && 's'}&nbsp;
                <div className={s.text_black}>{seconds}</div>&nbsp;sec
                {seconds !== 1 && 's'}
              </>
            )}
            {type === 'auctioned' && endpoint < 0 && 'ended'}
            {type !== 'auctioned' && `at ${moment(date).format('L')}, ${moment(date).format('LT')}`}
          </span>
        </div>
      </div>
      {(type === 'offered' || (type === 'auctioned' && endpoint > 0)) && (
        <Button
          color="orange"
          disabled={!yourId || (type === 'auctioned' && endpoint < 0) || yourId === id}
          className={s.button}
          onClick={handleBuyOrBid}
        >
          {type === 'auctioned' ? 'Bid' : 'Buy'}&nbsp;Now
        </Button>
      )}
    </div>
  );
};

export default InfoCard;
