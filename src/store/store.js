import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import mediaReducer from './Reducers/Media/mediaReducer';
import userReducer from './Reducers/User/userReducer';
import langReducer from './Reducers/Language/LangReducer';

const reducer = combineReducers({
  media: mediaReducer,
  user: userReducer,
  lang: langReducer,
})





const store = configureStore({
  reducer,
  middleware: [thunk]
});

export default store;
