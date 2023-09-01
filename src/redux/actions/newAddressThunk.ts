import { BaseAddress } from '@commercetools/platform-sdk';
import { DispatchType } from '../../hooks/hooks';
import {
  addAddressId,
  addDefaultAddress,
  addNewAddress,
} from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const newAddressThunk =
  (
    address: BaseAddress,
    version: number,
    isBilling: boolean,
    isDefault: boolean,
  ) =>
  async (dispatch: DispatchType) => {
    try {
      let userData = await addNewAddress(address, version);
      const addressId =
        userData.body.addresses[userData.body.addresses.length - 1].id;
      userData = await addAddressId(
        addressId!,
        userData.body.version,
        isBilling,
      );
      if (isDefault) {
        userData = await addDefaultAddress(
          addressId!,
          userData.body.version,
          isBilling,
        );
      }
      dispatch(
        setProfileData({ ...userData.body, version: userData.body.version }),
      );
    } catch (e) {
      console.log(e);
    }
  };

export default newAddressThunk;
