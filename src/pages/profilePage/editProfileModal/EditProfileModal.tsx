import React, { useState } from 'react';
import FormItem from 'antd/es/form/FormItem';
import { Button, Form, Input, message, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { fieldsProps } from '../../../components/form/userDataForm/formProps/fieldsProps';
import PersonalDataFormFields from '../../../components/form/userDataForm/PersonalDataFormFields';
import { updateProfile } from '../../../services/customerRequests';
import { setProfileData } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

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
        Change password
      </Title>
      <Form name="editProfile" id="editProfile" onFinish={onFinish}>
        <FormItem
          {...fieldsProps.email.props}
          initialValue={userData?.email}
          validateStatus={isEmailError ? 'error' : ''}
        >
          <Input placeholder="E-mail" onChange={() => setEmailError(false)} />
        </FormItem>
        <PersonalDataFormFields />
      </Form>
    </Modal>
  );
}

export default EditProfileModal;
