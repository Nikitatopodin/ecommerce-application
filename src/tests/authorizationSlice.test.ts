import authorization, {
  loginReducer,
  setProfileData,
  IInitialState,
} from '../redux/slices/authorizationSlice';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

const initialState: IInitialState = {
  isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
  userData: null,
};
const profileData: Customer = {
  id: 'userId',
  version: 1,
  createdAt: '',
  lastModifiedAt: '',
  email: 'customer@gmail.com',
  addresses: [],
  isEmailVerified: true,
  authenticationMode: 'Password',
};

describe('authorization slice', () => {
  it('should return initial state when passed an empty action', function () {
    const result = authorization(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });
  it('should set user data with "setProfileData" action', function () {
    const action = {
      type: setProfileData.type,
      payload: { ...profileData },
    };
    const result = authorization(initialState, action);
    expect(result.userData!.id).toBe('userId');
    expect(result.userData!.email).toBe('customer@gmail.com');
  });
});
