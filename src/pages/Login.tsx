import React, { useState } from 'react';
import { Button, Col, Form, FormInstance, Input, Row, Typography } from 'antd';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import loginUser from '../services/auth-api';
import formValidation from '../utils/formValidation';
import { ResponseCodes } from '../services/BuildClient';

interface IFormStyles {
  [key: string]: { [key: string]: string | number };
}

const formStyles: IFormStyles = {
  form: {
    maxWidth: 600,
    margin: '30vh auto',
    padding: '5em',
    border: 'solid 1px #f0f0f0',
    borderRadius: '.5em',
  },
  title: {
    textAlign: 'center',
  },
};

function Login(): JSX.Element {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const [isLoginError, setLoginError] = useState(false);

  const onReset = () => formRef.current?.resetFields();
  const onFinish = async (values: CustomerSignin) => {
    const response = await loginUser(values);
    const errorMessage = response.body.errors[0].code;
    if (errorMessage === ResponseCodes.loginError) {
      setLoginError(true);
    }
  };

  return (
    <Form
      name="login"
      form={form}
      ref={formRef}
      onFinish={onFinish}
      initialValues={{ remember: true }}
      style={formStyles.form}
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 6 }}
      onChange={() => setLoginError(false)}
    >
      <h1 style={formStyles.title}>Log in</h1>

      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={formValidation.email}
      >
        <Input placeholder="E-mail" id="login-email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={formValidation.password}
      >
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
        </Row>
      </Form.Item>
    </Form>
  );
}

export default Login;
