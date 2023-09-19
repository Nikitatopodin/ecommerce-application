import React from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import { Checkbox, Form, Input, Select } from 'antd';
import { fieldsProps } from './formProps/fieldsProps';
import formValidation from './formProps/formValidation';

interface IProps {
  isBilling: boolean;
  address?: BaseAddress;
}

const { Option } = Select;

function AddressesFormFields({ isBilling, address }: IProps): JSX.Element {
  const postalCodeProps = isBilling
    ? fieldsProps.postalCodeBilling.props
    : fieldsProps.postalCode.props;

  const countryProps = isBilling
    ? fieldsProps.countryBilling.props
    : fieldsProps.country.props;

  const cityProps = isBilling
    ? fieldsProps.cityBilling.props
    : fieldsProps.city.props;

  const streetProps = isBilling
    ? fieldsProps.streetBilling.props
    : fieldsProps.street.props;

  return (
    <>
      <Form.Item {...countryProps} initialValue={address?.country}>
        <Select placeholder="Please select a country">
          <Option value="US">U.S.A</Option>
          <Option value="RU">Russia</Option>
        </Select>
      </Form.Item>

      <Form.Item
        {...postalCodeProps}
        initialValue={address?.postalCode}
        rules={[
          ...formValidation.postalCode,
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

      <Form.Item {...cityProps} initialValue={address?.city}>
        <Input placeholder="City" />
      </Form.Item>

      <Form.Item {...streetProps} initialValue={address?.streetName}>
        <Input placeholder="Street" />
      </Form.Item>

      <Form.Item {...fieldsProps.defaultBillingAddress.props}>
        <Checkbox>Set as default address</Checkbox>
      </Form.Item>
    </>
  );
}

export default AddressesFormFields;

AddressesFormFields.defaultProps = {
  address: undefined,
};
