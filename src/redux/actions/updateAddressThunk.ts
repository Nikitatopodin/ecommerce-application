import { BaseAddress } from '@commercetools/platform-sdk';
import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import {
  addDefaultAddress,
  updateAddress,
} from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const updateAddressThunk =
  (
    formattedAddress: BaseAddress,
    version: number,
    defaultBillingAddress: boolean,
    isBilling: boolean,
    setEditMode: (isEditMode: boolean) => void,
  ) =>
  async (dispatch: DispatchType) => {
    try {
      updateAddress(formattedAddress, version)
        .then((response) => {
          if (defaultBillingAddress && formattedAddress.id) {
            return addDefaultAddress(
              formattedAddress.id,
              response.body.version,
              isBilling,
            );
          }
          return response;
        })
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
      setEditMode(false);
    } catch (e) {
      console.log(e);
    }
  };

export default updateAddressThunk;
