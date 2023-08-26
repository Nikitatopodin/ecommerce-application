import React from 'react';
import { DatePicker, Form, Input } from 'antd';
import { fieldsProps } from '../fieldsProps';

function PersonalDataFormFields() {
  return (
    <>
      <Form.Item {...fieldsProps.firstName.props}>
        <Input placeholder="First name" />
      </Form.Item>

      <Form.Item {...fieldsProps.lastName.props}>
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        {...fieldsProps.birthday.props}
        rules={[
          ...fieldsProps.birthday.rules,
          () => ({
            validator(_, value) {
              if (Date.now() - value.$d.getTime() > 378691200000) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  'Sorry, only users aged 12 or older can create an account',
                ),
              );
            },
          }),
        ]}
      >
        <DatePicker />
      </Form.Item>
    </>
  );
}

export default PersonalDataFormFields;
