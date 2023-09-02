import React, { useState } from 'react';
import { Button, Col, Form, Input, message, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import PersonalDataFormFields from '../../../components/form/userDataForm/PersonalDataFormFields';
import {
  fieldsProps,
  tailFormItemLayout,
} from '../../../components/form/fieldsProps';
import { updateProfile } from '../../../services/customerRequests';
import { setProfileData } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

interface ICallBack {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfoForm({ setEditMode }: ICallBack) {
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
          setEditMode(false);
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
    <Form
      name="userDataUpdate"
      style={{ maxWidth: 400, marginTop: '1em' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <FormItem
        {...fieldsProps.email.props}
        initialValue={userData?.email}
        validateStatus={isEmailError ? 'error' : ''}
      >
        <Input placeholder="E-mail" onChange={() => setEmailError(false)} />
      </FormItem>
      <PersonalDataFormFields />
      <Form.Item {...tailFormItemLayout}>
        <Row>
          <Col>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Col>
          <Col offset={2}>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default ProfileInfoForm;
