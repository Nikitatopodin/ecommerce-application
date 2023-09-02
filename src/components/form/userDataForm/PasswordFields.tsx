import React from 'react';
import { Form, Input } from 'antd';
import { fieldsProps } from '../fieldsProps';

function PasswordFields() {
  return (
    <>
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
        <Input.Password placeholder="Password" />
      </Form.Item>
    </>
  );
}

export default PasswordFields;
