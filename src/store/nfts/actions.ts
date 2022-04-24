import { createAction } from '@reduxjs/toolkit';

import {
  ApproveReq,
  BidReq,
  BurnReq,
  BuyReq,
  CommentReq,
  CreateNftReq,
  GetHotNftsReq,
  GetNftDataReq,
  LikeCommentReq,
  LikeNftReq,
  PatchNftReq,
  ReportReq,
  SearchNftReq,
  TransferReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const createToken = createAction<CreateNftReq>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftReq>(actionTypes.SEARCH_NFTS);
export const getHotNfts = createAction<GetHotNftsReq>(actionTypes.HOT_NFTS);
export const likeNft = createAction<LikeNftReq>(actionTypes.LIKE);
export const likeComment = createAction<LikeCommentReq>(actionTypes.LIKE_COMMENT);
export const comment = createAction<CommentReq>(actionTypes.COMMENT);
export const getNftData = createAction<GetNftDataReq>(actionTypes.GET_NFT_DATA);
export const patchNftData = createAction<PatchNftReq>(actionTypes.PATCH_NFT_DATA);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const buy = createAction<BuyReq>(actionTypes.BUY);
export const bid = createAction<BidReq>(actionTypes.BID);
export const burn = createAction<BurnReq>(actionTypes.BURN);
export const transfer = createAction<TransferReq>(actionTypes.TRANSFER);
export const report = createAction<ReportReq>(actionTypes.REPORT);
export const support = createAction<FormData>(actionTypes.SUPPORT);
