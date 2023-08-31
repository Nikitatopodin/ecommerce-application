import React from 'react';
import { Col, Descriptions, DescriptionsProps, Divider, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/hooks';

interface ICallBack {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfoDescription({ setEditMode }: ICallBack) {
  const userData = useAppSelector((state) => state.authorization.userData);

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

  return (
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
            setEditMode(true);
          }}
        />
      </Col>
    </Row>
  );
}

export default ProfileInfoDescription;
