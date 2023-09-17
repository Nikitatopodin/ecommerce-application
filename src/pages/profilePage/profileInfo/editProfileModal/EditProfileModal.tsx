import React, { useState } from 'react';
import { Button, Form, Input, message, Modal, Typography } from 'antd';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { fieldsProps } from '../../../../components/form/userDataForm/formProps/fieldsProps';
import PersonalDataFormFields from '../../../../components/form/userDataForm/PersonalDataFormFields';
import { updateProfile } from '../../../../services/customerRequests';
import { setProfileData } from '../../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const { Title } = Typography;

interface IProps {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

function EditProfileModal({ isModalOpen, setModalOpen }: IProps) {
  const [isEmailError, setEmailError] = useState(false);
  const userData = useAppSelector((state) => state.authorization.userData);
  const dispatch = useAppDispatch();
  const onFinish = async (values: Customer) => {
    if (userData) {
      updateProfile(values, userData.version)
        .then((response) => {
          dispatch(
            setProfileData({
              ...userData,
              version: response.body.version,
              email: response.body.email,
              firstName: response.body.firstName,
              lastName: response.body.lastName,
              dateOfBirth: response.body.dateOfBirth,
            }),
          );
          message.success('Your personal data is up to date');
          setModalOpen(false);
        })
        .catch(() => {
          setEmailError(true);
          message.error(
            'Sorry, an account with such an email already exists, you can use another email or log in to your account',
          );
        });
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          form="editProfile"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Edit
        </Button>,
        <Button
          form="editProfile"
          onClick={() => setModalOpen(false)}
          key="cancel"
        >
          Cancel
        </Button>,
      ]}
    >
      <Title style={{ textAlign: 'center', marginBottom: '1.5em' }} level={3}>
        Edit profile
      </Title>
      <Form name="editProfile" id="editProfile" onFinish={onFinish}>
        <Form.Item
          {...fieldsProps.email.props}
          initialValue={userData?.email}
          validateStatus={isEmailError ? 'error' : ''}
        >
          <Input placeholder="E-mail" onChange={() => setEmailError(false)} />
        </Form.Item>
        <PersonalDataFormFields />
      </Form>
    </Modal>
  );
}

export default EditProfileModal;
