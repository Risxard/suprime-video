import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import languageReducer from './language/index';
import authReducer from './auth/index';
import getIdSlice from './slices/getMediaId';

const reducer = combineReducers({
  getId: getIdSlice,
  lang: languageReducer,
  auth: authReducer
})


const store = configureStore({
  reducer,
  middleware: [thunk]
});

export default store;
