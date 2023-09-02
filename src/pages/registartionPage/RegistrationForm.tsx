import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { IRegistrationForm } from '../../types/types';
import { fieldsProps, tailFormItemLayout } from '../../components/form/userDataForm/formProps/fieldsProps';
import AddressesFormFields from '../../components/form/userDataForm/AddressesFormFields';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import PersonalDataFormFields from '../../components/form/userDataForm/PersonalDataFormFields';
import PasswordFields from '../../components/form/userDataForm/PasswordFields';
import signUpThunk from '../../redux/actions/signUpThunk';

function RegistrationForm(): JSX.Element {
  const [form] = Form.useForm();
  const [isAddressSingle, setAddressSingle] = useState(true);
  const [isSignupError, setSignupError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(
    (state) => state.authorization.isAuthorized,
  );

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized]);

  const onFinish = (values: IRegistrationForm) => {
    dispatch(signUpThunk(values, setSignupError));
  };

  return (
    <Form
      {...fieldsProps.registrationForm.props}
      form={form}
      onFinish={onFinish}
    >
      <h1 style={{ textAlign: 'center' }}>Create Account</h1>

      <Form.Item
        {...fieldsProps.email.props}
        validateStatus={isSignupError ? 'error' : ''}
      >
        <Input placeholder="E-mail" onChange={() => setSignupError(false)} />
      </Form.Item>

      <PasswordFields />
      <PersonalDataFormFields />

      <Form.Item {...fieldsProps.oneAddress.props}>
        <Checkbox
          defaultChecked={isAddressSingle}
          onChange={() => setAddressSingle(!isAddressSingle)}
        >
          Use the same address for both billing and shipping
        </Checkbox>
      </Form.Item>

      <h3 style={{ textAlign: 'center' }}>Address for shipping</h3>
      <AddressesFormFields isBilling={false} />

      {!isAddressSingle && (
        <>
          <h3 style={{ textAlign: 'center' }}>Address for billing</h3>
          <AddressesFormFields isBilling />
        </>
      )}

      {isSignupError && (
        <Form.Item {...tailFormItemLayout}>
          <Typography.Text type="danger">
            An account with such an email already exists, you can use another
            email or sign in to your account
          </Typography.Text>
        </Form.Item>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Row gutter={16}>
          <Col>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Col>
          <Col>
            <Button onClick={() => navigate('/login')}>Sign In</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
