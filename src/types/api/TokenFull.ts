/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionSlim } from './CollectionSlim';
import { Creator } from './Creator';
import { Currency } from './Currency';
import {IComment, IHistory, IOwner, IOwnerAuction, ISeller} from '../index';

export interface TokenFull {
  animation?: string;
  available?: string;
  bids?: string;
  collection: CollectionSlim;
  commentCount?: string;
  comments?: IComment[];
  creator: Creator;
  currency: Currency;
  currencyServiceFee?: string;
  description?: string;
  details?: any;
  digitalKey?: string;
  endAuction?: string;
  format?: string;
  hashtags?: { name: string }[];
  highestBid?: string;
  highestBidUsd?: string;
  history?: IHistory[];
  id?: number;
  internalId?: number;
  isAucSelling?: string;
  isLiked?: boolean;
  isSelling?: boolean;
  isTimedAucSelling?: string;
  likeCount?: number;
  media?: string;
  minimalBid?: string;
  minimalBidUsd?: string;
  name?: string;
  network?: string;
  ownerAuction?: IOwnerAuction[];
  owners?: IOwner | IOwner[];
  price?: string;
  royalty?: string;
  sellers?: ISeller[];
  selling?: string;
  serviceFee?: string;
  standart?: string;
  startAuction?: string;
  tags?: string;
  totalSupply: number;
  updatedAt?: string;
  usdPrice?: string;
  usdServiceFee?: string;
  views?: string;
}
