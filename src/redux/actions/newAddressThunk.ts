import { BaseAddress } from '@commercetools/platform-sdk';
import { DispatchType } from '../../hooks/hooks';
import { addAddressId, addNewAddress } from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const newAddressThunk =
  (address: BaseAddress, version: number, isBilling: boolean) =>
  async (dispatch: DispatchType) => {
    try {
      const response = await addNewAddress(address, version);
      const addressId =
        response.body.addresses[response.body.addresses.length - 1].id;
      const updatedVersion = response.body.version;
      const userData = await addAddressId(
        addressId!,
        updatedVersion,
        isBilling,
      );
      dispatch(
        setProfileData({ ...userData.body, version: userData.body.version }),
      );
    } catch (e) {
      console.log(e);
    }
  };

export default newAddressThunk;
