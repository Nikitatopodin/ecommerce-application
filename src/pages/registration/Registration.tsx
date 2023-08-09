import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Checkbox,
  Row,
  Col,
} from 'antd';
// import { signUp } from '../../services/API/ct';
import { IRegistrationForm } from '../../types/types';

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
  const [isAdressSingle, setIsAdressSingle] = useState(true);
  // const [formState, setFormState] = useState({});

  const onFinish = (values: IRegistrationForm) => {
    console.log('Received values of form: ', values);
    // signUp().then(console.log).catch(console.log);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        margin: '0 auto',
        maxWidth: 600,
        padding: '10px 50px 10px 0',
        border: 'solid 1px #f0f0f0',
        borderRadius: '.5em',
      }}
      scrollToFirstError
    >
      <h1 style={{ textAlign: 'center' }}>Create Account</h1>

      <Form.Item
        name="email"
        label="E-mail"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'Please enter a valid email address',
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
          { required: true, message: 'Please input your password' },
          { min: 8, message: 'Password must be at least 8 characters long' },
          {
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
            message:
              'Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character',
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
                new Error('Passwords do not match, please try again'),
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
          {
            pattern: /^[a-zA-Z ]+$/,
            message: 'First name must contain only characters',
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
          {
            pattern: /^[a-zA-Z ]+$/,
            message: 'Last name must contain only characters',
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
          () => ({
            validator(_, value) {
              if (Date.now() - value.$d.getTime() > 378432000000) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('Store has been available since 12 age'),
              );
            },
          }),
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox
          defaultChecked={isAdressSingle}
          onChange={() => setIsAdressSingle(!isAdressSingle)}
        >
          Use the same address for both billing and shipping default
        </Checkbox>
      </Form.Item>

      {!isAdressSingle && (
        <h3 style={{ textAlign: 'center' }}>Address for shipping</h3>
      )}

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
          {
            pattern: /^[0-9]+$/,
            message: 'Must contain only characters',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('country') === 'usa') {
                if (value.length === 5) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Postal code must contain 5 digits'),
                );
              }
              if (getFieldValue('country') === 'russia') {
                if (value.length === 6) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Postal code must contain 6 digits'),
                );
              }
              return Promise.resolve();
            },
          }),
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
          {
            pattern: /^[a-zA-Z ]+$/,
            message: 'City must contain only characters',
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
          {
            pattern: /^[a-zA-Z0-9-'"]+$/,
            message: 'Street must contain only characters',
          },
        ]}
      >
        <Input placeholder="Street" />
      </Form.Item>

      {!isAdressSingle && (
        <>
          <h3 style={{ textAlign: 'center' }}>Address for billing</h3>

          <Form.Item
            name="countryBilling"
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
            name="postalCodeBilling"
            label="Postal code"
            hasFeedback
            dependencies={['countryBilling']}
            rules={[
              {
                required: true,
                message: 'Please input postal code',
                whitespace: true,
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Must contain only characters',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('countryBilling') === 'usa') {
                    if (value.length === 5) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Postal code must contain 5 digits'),
                    );
                  }
                  if (getFieldValue('countryBilling') === 'russia') {
                    if (value.length === 6) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Postal code must contain 6 digits'),
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Postal code" />
          </Form.Item>
          <Form.Item
            name="cityBilling"
            label="City"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input city',
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Z ]+$/,
                message: 'City must contain only characters',
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            name="streetBilling"
            label="Street"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input street',
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Z0-9-'"]+$/,
                message: 'Street must contain only characters',
              },
            ]}
          >
            <Input placeholder="Street" />
          </Form.Item>
        </>
      )}

      <Form.Item {...tailFormItemLayout}>
        <Row gutter={16}>
          <Col span={6}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Col>
          <Col span={6}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default Registration;
