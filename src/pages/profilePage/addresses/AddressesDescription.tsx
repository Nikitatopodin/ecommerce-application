import React from 'react';
import { Badge, Card, Col, Descriptions, DescriptionsProps } from 'antd';
import { BaseAddress } from '@commercetools/platform-sdk';

interface IProps {
  address: BaseAddress;
  isDefault: boolean;
}

function AddressesDescription({ address, isDefault }: IProps) {
  const addresses: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Postal code',
      children: address.postalCode,
    },
    {
      key: '2',
      label: 'Country',
      children: address.country === 'RU' ? 'Russia' : 'USA',
    },
    {
      key: '3',
      label: 'City',
      children: address.city,
    },
    {
      key: '4',
      label: 'Street',
      children: address.streetName,
    },
  ];

  if (isDefault) {
    return (
      <Col span={20}>
        <Badge.Ribbon text="Default" color="green">
          <Card size="small" style={{ marginTop: '.5em' }}>
            <Descriptions layout="vertical" items={addresses} />
          </Card>
        </Badge.Ribbon>
      </Col>
    );
  }
  return (
    <Col span={20}>
      <Card size="small" style={{ marginTop: '.5em' }}>
        <Descriptions layout="vertical" items={addresses} />
      </Card>
    </Col>
  );
}

export default AddressesDescription;
