import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Checkbox,
  Row,
  Col,
  Typography,
  message,
} from 'antd';
import { signIn, signUp } from '../../../services/customerRequests';
import { IRegistrationForm } from '../../../types/types';
import convertFormData from '../../../utils/convertFormData';
import { fieldsProps, tailFormItemLayout } from '../fieldsProps';
import AddressesFormFields from './AddressesFormFields';
import { loginReducer } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import PersonalDataFormFields from './PersonalDataFormFields';

function RegistrationForm(): JSX.Element {
  const [form] = Form.useForm();
  const [isAddressSingle, setAddressSingle] = useState(true);
  const [isSignupError, setSignupError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorization = useAppSelector(
    (state) => state.authorization.isAuthorized,
  );

  useEffect(() => {
    if (authorization) {
      navigate('/');
    }
  }, [authorization]);

  const onFinish = (values: IRegistrationForm) => {
    signUp(convertFormData(values))
      .then(() =>
        signIn(values)
          .then(() => {
            dispatch(loginReducer(true));
            message.success('Sign up success');
          })
          .catch(console.log),
      )
      .catch(() => {
        setSignupError(true);
        message.error(
          'Sorry, an account with such an email already exists, you can use another email or log in to your account',
        );
      });
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

      <Form.Item {...fieldsProps.password.props}>
        <Input.Password placeholder="Password" />
      </Form.Item>

      <Form.Item
        {...fieldsProps.confirm.props}
        rules={[
          ...fieldsProps.confirm.rules,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Passwords do not match, please try again'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

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
            <Button type="link" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
