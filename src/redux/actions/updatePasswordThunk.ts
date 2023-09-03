import { message } from 'antd';
import { DispatchType } from '../../hooks/hooks';
import { updatePassword } from '../../services/customerRequests';
import { setProfileData } from '../slices/authorizationSlice';

const updatePasswordThunk =
  (currentPassword: string, newPassword: string, version: number) =>
  async (dispatch: DispatchType) => {
    try {
      if (currentPassword && version) {
        updatePassword(currentPassword, newPassword, version)
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
      }
    } catch (e) {
      console.log(e);
    }
  };

export default updatePasswordThunk;
