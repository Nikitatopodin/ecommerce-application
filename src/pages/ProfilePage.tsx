import React, { useState } from 'react';
import type { DescriptionsProps } from 'antd';
import { Col, Descriptions, Divider, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RegistrationForm from '../components/form/registration/RegistrationForm';
import { useAppSelector } from '../hooks/hooks';

const personalInfo: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'First name',
    children: '',
  },
  {
    key: '2',
    label: 'Last Name',
    children: '',
  },
  {
    key: '3',
    label: 'Date of birth',
    children: '',
  },
];
const addresses: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Shipping address',
    children: '',
  },
  {
    key: '2',
    label: 'Billing address',
    children: '',
  },
];

function ProfilePage() {
  const [isEditMode, setEditMode] = useState(false);
  const userData = useAppSelector((state) => state.authorization.userData);
  console.log('user data', userData);
  return isEditMode ? (
    <RegistrationForm />
  ) : (
    <Row justify="center">
      <Col span={14}>
        <Row>
          <Col span={20}>
            <Descriptions title="Personal Info" items={personalInfo} />
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
        <Row>
          <Divider />
          <Col span={20}>
            <Descriptions title="Addresses" items={addresses} />
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
      </Col>
    </Row>
  );
}

export default ProfilePage;
