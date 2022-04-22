import nftsActionTypes from 'store/nfts/actionTypes';
import userActionTypes from 'store/user/actionTypes';
import { RequestStatus } from 'types/store';

// import profileActionsTypes from 'store/profile/actionTypes';
import { UIState } from 'types';

import { getUIReducer } from '.';

const initialState: UIState = {
  [userActionTypes.GET_BALANCE]: RequestStatus.INIT,
  [userActionTypes.UPDATE_USER_INFO]: RequestStatus.INIT,
  [userActionTypes.PATCH_USER_INFO]: RequestStatus.INIT,
  [userActionTypes.LOGIN]: RequestStatus.INIT,
  [nftsActionTypes.BID]: RequestStatus.INIT,
  [nftsActionTypes.BUY]: RequestStatus.INIT,
  [nftsActionTypes.BURN]: RequestStatus.INIT,
  [nftsActionTypes.TRANSFER]: RequestStatus.INIT,
  [nftsActionTypes.SUPPORT]: RequestStatus.INIT,
  [nftsActionTypes.REPORT]: RequestStatus.INIT,
  [nftsActionTypes.CREATE_TOKEN]: RequestStatus.INIT,
  [nftsActionTypes.HOT_NFTS]: RequestStatus.INIT,
  [nftsActionTypes.PATCH_NFT_DATA]: RequestStatus.INIT,
  [nftsActionTypes.GET_NFT_DATA]: RequestStatus.INIT,
  [nftsActionTypes.SEARCH_NFTS]: RequestStatus.INIT,
  [nftsActionTypes.LIKE]: RequestStatus.INIT,
  [nftsActionTypes.COMMENT]: RequestStatus.INIT,
  [nftsActionTypes.LIKE_COMMENT]: RequestStatus.INIT,
  [nftsActionTypes.APPROVE]: RequestStatus.INIT,
  [nftsActionTypes.SEARCH_NFTS]: RequestStatus.INIT,
};

const uiReducer = getUIReducer(initialState);

export default uiReducer;
