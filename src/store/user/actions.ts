import { createAction } from '@reduxjs/toolkit';

import { GetTokenBalanceReq, LoginReq, UpdateUserInfoReq } from 'types/requests';

import actionTypes from './actionTypes';

export const getBalance = createAction<GetTokenBalanceReq>(actionTypes.GET_BALANCE);
export const login = createAction<LoginReq>(actionTypes.LOGIN);
export const updateUserInfo = createAction<UpdateUserInfoReq>(actionTypes.UPDATE_USER_INFO);
export const patchUserInfo = createAction<FormData>(actionTypes.PATCH_USER_INFO);
