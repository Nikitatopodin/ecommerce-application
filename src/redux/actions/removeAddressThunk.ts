import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { removeAddress } from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const removeAddressThunk =
  (addressId: string, version: number) => async (dispatch: DispatchType) => {
    try {
      removeAddress(addressId, version)
        .then((response) => {
          dispatch(
            setProfileData({
              ...response.body,
              version: response.body.version,
            }),
          );
          message.success('Your addresses is up to date');
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
    } catch (e) {
      console.log(e);
    }
  };

export default removeAddressThunk;
