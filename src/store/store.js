import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/authReducer';
import thunkMiddleware from 'redux-thunk';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';
/*export default configureStore({
  reducer: {},
})*/



export const store = configureStore({
  middleware:[thunkMiddleware],
  reducer: {
    auth: authReducer,
    ui:uiReducer,
    notes:notesReducer
  }
})