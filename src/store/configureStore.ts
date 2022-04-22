import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import createSagaMiddleware from 'redux-saga';

import nftsActionTypes from './nfts/actionTypes';
import userActionTypes from './user/actionTypes';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const userPersistConfig = {
  key: 'user',
  storage,
};

const reducers = {
  ...reducer,
  user: persistReducer(userPersistConfig, reducer.user),
};

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          userActionTypes.LOGIN,
          userActionTypes.UPDATE_USER_INFO,
          userActionTypes.GET_BALANCE,
          userActionTypes.PATCH_USER_INFO,
          nftsActionTypes.BUY,
          nftsActionTypes.PATCH_NFT_DATA,
          nftsActionTypes.BURN,
          nftsActionTypes.TRANSFER,
          nftsActionTypes.BID,
          nftsActionTypes.LIKE,
          nftsActionTypes.SUPPORT,
        ],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default { store, persistor };
