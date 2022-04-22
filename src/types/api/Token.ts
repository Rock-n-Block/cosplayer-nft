/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionSlim } from './CollectionSlim';
import { Creator } from './Creator';
import { Currency } from './Currency';
import {IOwner} from "../index";

export interface Token {
  animation?: string;
  available?: string;
  bids?: string;
  collection: CollectionSlim;
  commentCount?: string;
  creator: Creator;
  currency: Currency;
  description?: string;
  details?: any;
  digitalKey?: string;
  endAuction?: string;
  format?: string;
  highestBid?: string;
  highestBidUsd?: string;
  id?: number;
  isAucSelling?: string;
  isLiked?: string;
  isSelling?: string;
  isTimedAucSelling?: string;
  likeCount?: string;
  media?: string;
  minimalBid?: string;
  minimalBidUsd?: string;
  name?: string;
  network?: string;
  owners?: IOwner | IOwner[];
  price?: string;
  royalty?: string;
  sellers?: string;
  selling?: boolean;
  standart?: string;
  startAuction?: string;
  tags?: string;
  totalSupply: number;
  updatedAt?: string;
  usdPrice?: string;
}
