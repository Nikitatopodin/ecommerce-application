import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { loginReducer } from '../slices/authorizationSlice';
import { activeMenuItemsReducer } from '../slices/navMenuSlice';
import getCartThunk from './getCartThunk';

const signOutThunk = () => (dispatch: DispatchType) => {
  dispatch(loginReducer({ isAuthorized: false, userData: null }));
  dispatch(activeMenuItemsReducer(''));
  localStorage.removeItem('token');
  if (localStorage.getItem('anonymousToken')) {
    localStorage.setItem('token', localStorage.getItem('anonymousToken')!);
  }
  dispatch(getCartThunk());
  message.success('You have successfully signed out');
};
export default signOutThunk;
