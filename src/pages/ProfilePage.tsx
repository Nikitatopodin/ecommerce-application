import React, { useState } from 'react';
import { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { DescriptionsProps } from 'antd';
import { Button, Col, Descriptions, Divider, Form, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import PersonalDataFormFields from '../components/form/userDataForm/PersonalDataFormFields';
import { tailFormItemLayout } from '../components/form/fieldsProps';
import { updateAddresses, updateProfile } from '../services/customerRequests';
import { setProfileData } from '../redux/slices/authorizationSlice';
import AddressesFormFields from '../components/form/userDataForm/AddressesFormFields';

interface IAddressValues {
  city: string;
  cityBilling: string;
  country: string;
  countryBilling: 'RU' | 'USA';
  defaultBillingAddress: string;
  postalCode: string;
  postalCodeBilling: string;
  street: string;
  streetBilling: string;
}

function ProfilePage() {
  const [isPersonalDataEditMode, setPersonalDataEditMode] = useState(false);
  const [isAddressesEditMode, setAddressesEditMode] = useState(false);
  const userData = useAppSelector((state) => state.authorization.userData);
  const dispatch = useAppDispatch();

  const personalInfo: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'First name',
      children: userData?.firstName,
    },
    {
      key: '2',
      label: 'Last Name',
      children: userData?.lastName,
    },
    {
      key: '3',
      label: 'Date of birth',
      children: userData?.dateOfBirth,
    },
  ];
  const shippingAddress: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Postal code',
      children: userData?.addresses[0].postalCode,
    },
    {
      key: '2',
      label: 'Country',
      children: userData?.addresses[0].country === 'RU' ? 'Russia' : 'USA',
    },
    {
      key: '3',
      label: 'City',
      children: userData?.addresses[0].city,
    },
    {
      key: '4',
      label: 'Street',
      children: userData?.addresses[0].streetName,
    },
  ];
  const billingAddress: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Postal code',
      children: userData?.addresses[1]?.postalCode,
    },
    {
      key: '2',
      label: 'Country',
      children: userData?.addresses[1]?.country === 'RU' ? 'Russia' : 'USA',
    },
    {
      key: '3',
      label: 'City',
      children: userData?.addresses[1]?.city,
    },
    {
      key: '4',
      label: 'Street',
      children: userData?.addresses[1]?.streetName,
    },
  ];
  const onProfileDataChanged = async (values: Customer) => {
    if (userData) {
      updateProfile(values, userData.version).then((response) => {
        dispatch(
          setProfileData({
            ...userData,
            version: response.body.version,
            firstName: response.body.firstName,
            lastName: response.body.lastName,
            dateOfBirth: response.body.dateOfBirth,
          }),
        );
      });
      setPersonalDataEditMode(false);
    }
  };

  const onAddressesChanged = async (values: IAddressValues) => {
    if (userData) {
      const formattedValues = [
        {
          country: values.country,
          postalCode: values.postalCode,
          city: values.city,
          streetName: values.street,
          id: userData?.addresses[0].id,
        },
        {
          country: values.countryBilling,
          postalCode: values.postalCodeBilling,
          city: values.cityBilling,
          streetName: values.streetBilling,
          id: userData?.addresses[1].id,
        },
      ];
      updateAddresses(formattedValues, userData.version).then((response) => {
        dispatch(
          setProfileData({
            ...response.body,
            version: response.body.version,
          }),
        );
      });
      setAddressesEditMode(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '1em' }}>
      <Col span={12}>
        {isPersonalDataEditMode ? (
          <Form
            name="userDataUpdate"
            style={{ maxWidth: 400, marginTop: '1em' }}
            initialValues={{ remember: true }}
            onFinish={onProfileDataChanged}
            autoComplete="off"
          >
            <PersonalDataFormFields />
            <Form.Item {...tailFormItemLayout}>
              <Row>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                </Col>
                <Col offset={2}>
                  <Button onClick={() => setPersonalDataEditMode(false)}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        ) : (
          <Row>
            <Col span={20}>
              <Descriptions
                layout="vertical"
                title="Personal Info"
                items={personalInfo}
              />
            </Col>
            <Col span={4}>
              <EditOutlined
                style={{ marginTop: '.3em', color: '#4f4f4f' }}
                onClick={() => {
                  setPersonalDataEditMode(true);
                }}
              />
            </Col>
          </Row>
        )}
        {isAddressesEditMode ? (
          <Form
            name="addressesUpdate"
            style={{ maxWidth: 400, marginTop: '1em' }}
            initialValues={{ remember: true }}
            onFinish={onAddressesChanged}
            autoComplete="off"
          >
            <AddressesFormFields isBilling={false} />
            <AddressesFormFields isBilling />

            <Form.Item {...tailFormItemLayout}>
              <Row>
                <Col>
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                </Col>
                <Col offset={2}>
                  <Button onClick={() => setAddressesEditMode(false)}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        ) : (
          <Row>
            <Divider />
            <Col span={20}>
              <Descriptions
                layout="vertical"
                title="Shipping address"
                items={shippingAddress}
              />
              {userData?.addresses[1] && (
                <Descriptions
                  layout="vertical"
                  title="Billing address"
                  items={billingAddress}
                />
              )}
            </Col>
            <Col span={4}>
              <EditOutlined
                style={{ marginTop: '.3em', color: '#4f4f4f' }}
                onClick={() => {
                  setAddressesEditMode(true);
                }}
              />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
