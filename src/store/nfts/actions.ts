/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit';

import { SearchNftAction } from 'types/requests';

import actionTypes from './actionTypes';

export const getCategories = createAction<any>(actionTypes.GET_CATEGORIES);
export const createToken = createAction<FormData>(actionTypes.CREATE_TOKEN);
export const searchNfts = createAction<SearchNftAction>(actionTypes.SEARCH_NFTS);
