import { createAction } from '@reduxjs/toolkit';

import { CreateNftReq, GetHotNftsReq, LikeNftReq, SearchNftAction } from 'types/requests';

import actionTypes from './actionTypes';

export const createToken = createAction<CreateNftReq>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftAction>(actionTypes.SEARCH_NFTS);
export const getHotNfts = createAction<GetHotNftsReq>(actionTypes.HOT_NFTS);
export const likeNft = createAction<LikeNftReq>(actionTypes.LIKE);
