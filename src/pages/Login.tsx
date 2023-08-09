import React from 'react';
import { Button, Col, Form, FormInstance, Input, Row } from 'antd';
import { CustomerSignin } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import loginUser from '../services/auth-api';
import formValidation from '../utils/formValidation';

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

  const onReset = () => formRef.current?.resetFields();
  const onFinish = (values: CustomerSignin) => {
    loginUser(values);
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
    >
      <h1 style={formStyles.title}>Log in</h1>

      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={formValidation.email}
      >
        <Input placeholder="E-mail" id="login-email"/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={formValidation.password}
      >
        <Input.Password placeholder="Password" id="login-password"/>
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
