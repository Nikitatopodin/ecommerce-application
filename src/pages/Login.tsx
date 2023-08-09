import React from 'react';
import { Col, Form, FormInstance, Row } from 'antd';
import InputComponent from '../components/input/InputComponent';
import ButtonComponent from '../components/button/ButtonComponent';

type FieldType = {
  username?: string;
  password?: string;
};

function Login(): JSX.Element {
  const formRef = React.useRef<FormInstance>(null);
  const [form] = Form.useForm();

  const onReset = () => formRef.current?.resetFields();
  const onFinish = (values: string) => console.log('Success:', values);
  const onFinishFailed = () => console.log('Failed:');

  return (
    <Form
      name="login"
      form={form}
      ref={formRef}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      style={{
        maxWidth: 600,
        margin: '30vh auto',
        padding: '5em',
        border: 'solid 1px #f0f0f0',
        borderRadius: '.5em',
      }}
      wrapperCol={{ span: 16 }}
      labelCol={{ span: 6 }}
    >
      <h1 style={{ textAlign: 'center' }}>Log in</h1>
      <Form.Item<FieldType>
        name="username"
        label="E-mail"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your username!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
      >
        <InputComponent
          placeholder="E-mail"
          isPasswordType={false}
          onInput={() => console.log('input')}
          onBlur={() => console.log('input')}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        label="Password"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your password' },
          { min: 8, message: 'Password must be at least 8 characters long' },
          {
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
            message:
              'Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character',
          },
          {
            pattern: /^\S(?:.*\S)?$/,
            message: 'Password must not contain leading or trailing whitespace',
          },
        ]}
      >
        <InputComponent
          status={undefined}
          placeholder="Password"
          isPasswordType
          onInput={() => console.log('password')}
          onBlur={() => console.log('password')}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row gutter={16}>
          <Col>
            <ButtonComponent
              disabled={false}
              type="primary"
              title="Log in"
              htmlType="submit"
            />
          </Col>
          <Col>
            <ButtonComponent
              type={undefined}
              title="Reset"
              htmlType="reset"
              onClick={onReset}
            />
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default Login;
