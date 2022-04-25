import { createAction } from '@reduxjs/toolkit';

import { GetProfileInfoReq } from 'types';

import profileActionTypes from './actionTypes';

export const getProfileById = createAction<GetProfileInfoReq>(profileActionTypes.GET_PROFILE);

const profileActionCreators = {
  getProfileById,
};
export default profileActionCreators;
