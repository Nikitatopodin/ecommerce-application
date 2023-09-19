import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Form, Input } from 'antd';
import { fieldsProps } from './formProps/fieldsProps';
import { useAppSelector } from '../../hooks/hooks';

function PersonalDataFormFields() {
  const personalData = useAppSelector((state) => state.authorization.userData);
  return (
    <>
      <Form.Item
        {...fieldsProps.firstName.props}
        initialValue={personalData?.firstName}
      >
        <Input placeholder="First name" />
      </Form.Item>

      <Form.Item
        {...fieldsProps.lastName.props}
        initialValue={personalData?.lastName}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        {...fieldsProps.dateOfBirth.props}
        initialValue={dayjs(personalData?.dateOfBirth)}
        rules={[
          ...fieldsProps.dateOfBirth.rules,
          () => ({
            validator(_, value) {
              if (value && Date.now() - value.$d.getTime() > 378691200000) {
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
