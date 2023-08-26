import React from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import { fieldsProps } from '../fieldsProps';

const { Option } = Select;

function BillingAddress(): JSX.Element {
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Address for billing</h3>

      <Form.Item {...fieldsProps.countryBilling.props}>
        <Select placeholder="Please select a country">
          <Option value="US">U.S.A</Option>
          <Option value="RU">Russia</Option>
        </Select>
      </Form.Item>

      <Form.Item
        {...fieldsProps.postalCodeBilling.props}
        rules={[
          ...fieldsProps.postalCodeBilling.rules,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('countryBilling') === 'US') {
                if (value.length === 5) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Postal code must contain 5 digits'),
                );
              }
              if (getFieldValue('countryBilling') === 'RU') {
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

      <Form.Item {...fieldsProps.cityBilling.props}>
        <Input placeholder="City" />
      </Form.Item>

      <Form.Item {...fieldsProps.streetBilling.props}>
        <Input placeholder="Street" />
      </Form.Item>

      <Form.Item {...fieldsProps.defaultBillingAddress.props}>
        <Checkbox>Set as default address</Checkbox>
      </Form.Item>
    </>
  );
}

export default BillingAddress;
