import { DispatchType } from '../../hooks/hooks';
import { getProfile } from '../../services/customerRequests';
import { loginReducer } from '../slices/authorizationSlice';

const isAuthorized = localStorage.getItem('isAuthorized');
const initializeAppThunk = () => async (dispatch: DispatchType) => {
  if (isAuthorized) {
    try {
      const response = await getProfile();
      const userData = response.body;
      dispatch(loginReducer({ isAuthorized: true, userData }));
    } catch (e) {
      console.log(e);
    }
  }
};

export default initializeAppThunk;
