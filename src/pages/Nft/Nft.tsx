import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getNftData } from 'store/nfts/actions';
import { clearDetailedNft } from 'store/nfts/reducer';

import { TokenMenu } from './components/TokenMenu';
import { TokenPreview } from './components/TokenPreview';

import s from './Nft.module.scss';

export const Nft: FC = () => {
  const { id = 1 } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNftData({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clearDetailedNft());
    };
  }, [dispatch]);

  return (
    <div className={s.token_wrapper}>
      <div className={s.token_wrapper_preview}>
        <TokenPreview />
      </div>
      <TokenMenu />
    </div>
  );
};
