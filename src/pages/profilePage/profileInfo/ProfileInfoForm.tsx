import React from 'react';
import { Button, Col, Form, message, Row } from 'antd';
import PersonalDataFormFields from '../../../components/form/userDataForm/PersonalDataFormFields';
import { tailFormItemLayout } from '../../../components/form/fieldsProps';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { updateProfile } from '../../../services/customerRequests';
import { setProfileData } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

interface ICallBack {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfoForm({ setEditMode }: ICallBack) {
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
              firstName: response.body.firstName,
              lastName: response.body.lastName,
              dateOfBirth: response.body.dateOfBirth,
            }),
          );
          message.success('Your personal data is up to date');
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
      setEditMode(false);
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
