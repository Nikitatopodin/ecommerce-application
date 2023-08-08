import React from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Registration(): JSX.Element {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item {...tailFormItemLayout}>
        <h1>Create Account</h1>
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="E-mail" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        hasFeedback
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input your first name',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="First name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last name"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input your last name',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        name="birthday"
        label="Date of birth"
        hasFeedback
        rules={[
          {
            type: 'object' as const,
            required: true,
            message: 'Please select time!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="country"
        label="Country"
        hasFeedback
        rules={[{ required: true, message: 'Please select your country!' }]}
      >
        <Select placeholder="Please select a country">
          <Option value="usa">U.S.A</Option>
          <Option value="russia">Russia</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="postalCode"
        label="Postal code"
        hasFeedback
        dependencies={['country']}
        rules={[
          {
            required: true,
            message: 'Please input postal code',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Postal code" />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input city',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="City" />
      </Form.Item>

      <Form.Item
        name="street"
        label="Street"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please input street',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Street" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Registration;
