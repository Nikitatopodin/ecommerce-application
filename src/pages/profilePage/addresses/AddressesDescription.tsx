import React from 'react';
import { Badge, Card, Col, Descriptions, DescriptionsProps, Row } from 'antd';
import { BaseAddress } from '@commercetools/platform-sdk';
import { EditOutlined } from '@ant-design/icons';

interface IProps {
  address: BaseAddress;
  isDefault: boolean;
  setEditMode: (isEditMode: boolean) => void;
}

function AddressesDescription({ address, isDefault, setEditMode }: IProps) {
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
      <Badge.Ribbon text="Default" color="green">
        <Card size="small" style={{ marginTop: '.5em' }}>
          <Row gutter={20}>
            <Col span={20}>
              <Descriptions layout="vertical" items={addresses} />
            </Col>
            <Col span={4}>
              <EditOutlined
                style={{ color: '#4f4f4f' }}
                onClick={() => {
                  setEditMode(true);
                }}
              />
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
    );
  }
  return (
    <Card size="small" style={{ marginTop: '.5em' }}>
      <Row gutter={20}>
        <Col span={20}>
          <Descriptions layout="vertical" items={addresses} />
        </Col>
        <Col span={4}>
          <EditOutlined
            style={{ color: '#4f4f4f' }}
            onClick={() => {
              setEditMode(true);
            }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default AddressesDescription;
