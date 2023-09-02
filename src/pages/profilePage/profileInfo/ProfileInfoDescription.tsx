import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Col, Descriptions, DescriptionsProps, Row } from 'antd';
import { useAppSelector } from '../../../hooks/hooks';

interface IProps {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfoDescription({ setEditMode }: IProps) {
  const userData = useAppSelector((state) => state.authorization.userData);
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
      label: 'E-mail',
      children: userData?.email,
    },
    {
      key: '4',
      label: 'Date of birth',
      children: userData?.dateOfBirth,
    },
  ];

  return (
    <Row gutter={20}>
      <Col span={20}>
        <Descriptions layout="vertical" items={personalInfo} />
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
  );
}

export default ProfileInfoDescription;
