import { createAction } from '@reduxjs/toolkit';

import {
  ApproveNftReq,
  ApproveReq,
  BidReq,
  BurnReq,
  BuyReq,
  CommentReq,
  CreateNftReq,
  DeleteCommentReq,
  EndAuctionReq,
  GetHotNftsReq,
  GetNftDataReq,
  LikeCommentReq,
  LikeNftReq,
  PatchNftReq,
  ReportReq,
  SearchCountriesReq,
  SearchHashtagsReq,
  SearchNftReq,
  TransferReq,
} from 'types/requests';

import actionTypes from './actionTypes';

export const createToken = createAction<CreateNftReq>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftReq>(actionTypes.SEARCH_NFTS);
export const searchHashtags = createAction<SearchHashtagsReq>(actionTypes.SEARCH_HASHTAGS);
export const searchCountries = createAction<SearchCountriesReq>(actionTypes.SEARCH_COUNTRIES);
export const getHotNfts = createAction<GetHotNftsReq>(actionTypes.HOT_NFTS);
export const likeNft = createAction<LikeNftReq>(actionTypes.LIKE);
export const likeComment = createAction<LikeCommentReq>(actionTypes.LIKE_COMMENT);
export const deleteComment = createAction<DeleteCommentReq>(actionTypes.DELETE_COMMENT);
export const comment = createAction<CommentReq>(actionTypes.COMMENT);
export const getNftData = createAction<GetNftDataReq>(actionTypes.GET_NFT_DATA);
export const patchNftData = createAction<PatchNftReq>(actionTypes.PATCH_NFT_DATA);
export const approve = createAction<ApproveReq>(actionTypes.APPROVE);
export const approveNft = createAction<ApproveNftReq>(actionTypes.APPROVE_NFT);
export const buy = createAction<BuyReq>(actionTypes.BUY);
export const bid = createAction<BidReq>(actionTypes.BID);
export const endAuction = createAction<EndAuctionReq>(actionTypes.END_AUCTION);
export const burn = createAction<BurnReq>(actionTypes.BURN);
export const transfer = createAction<TransferReq>(actionTypes.TRANSFER);
export const report = createAction<ReportReq>(actionTypes.REPORT);
export const support = createAction<FormData>(actionTypes.SUPPORT);
