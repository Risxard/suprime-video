import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducer from './auth/index';
import getIdSlice from './slices/getMediaId';
import modalsSlice from './slices/modals';
import popupReducer from "./slices/popupSlice";

const reducer = combineReducers({
  getId: getIdSlice,
  auth: authReducer,
  modals: modalsSlice,
  popup: popupReducer,
})


const store = configureStore({
  reducer,
  middleware: [thunk]
});

export default store;
