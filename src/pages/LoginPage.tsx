import React, { useState } from 'react';
import { Button, Col, Form, FormInstance, Input, Row, Typography } from 'antd';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { useNavigate } from 'react-router-dom';
import signIn from '../services/apiLogIn';
import { ResponseCodes } from '../services/apiRoot';
import { useAppDispatch } from '../hooks/hooks';
import { loginReducer } from '../redux/slices/authorizationSlice';
import {
  fieldsProps,
  tailFormItemLayout,
} from '../components/form/fieldsProps';

function LoginPage(): JSX.Element {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const [isLoginError, setLoginError] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onReset = () => formRef.current?.resetFields();
  const onFinish = async (values: CustomerSignin) => {
    signIn(values)
      .then(() => {
        dispatch(loginReducer(true));
        navigate('/');
      })
      .catch((err) => {
        const errorMessage = err.body.errors[0].code;
        if (errorMessage === ResponseCodes.loginError) {
          setLoginError(true);
        }
      });
  };

  return (
    <Form
      {...fieldsProps.loginForm.props}
      form={form}
      ref={formRef}
      onFinish={onFinish}
      onChange={() => setLoginError(false)}
    >
      <h1 style={{ textAlign: 'center' }}>Log in</h1>

      <Form.Item {...fieldsProps.email.props}>
        <Input placeholder="E-mail" id="login-email" />
      </Form.Item>

      <Form.Item {...fieldsProps.password.props}>
        <Input.Password placeholder="Password" id="login-password" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        {isLoginError && (
          <Typography.Text type="danger">
            Sorry, the provided account doesn&apos;t exist. Please check the
            username or password or consider creating a new account
          </Typography.Text>
        )}
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Row gutter={16}>
          <Col>
            <Button type="primary" htmlType="submit" id="login-submit-button">
              Log in
            </Button>
          </Col>
          <Col>
            <Button htmlType="button" onClick={onReset} id="login-reset-button">
              Reset
            </Button>
          </Col>
          <Col>
            <Button type="link" onClick={() => navigate('/registration')}>
              Create account
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default LoginPage;
