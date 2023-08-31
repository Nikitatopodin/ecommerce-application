import React from 'react';
import { Col, Descriptions, DescriptionsProps, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/hooks';

interface ICallBack {
  setEditMode: (isEditMode: boolean) => void;
}

function ProfileInfoDescription({ setEditMode }: ICallBack) {
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
      label: 'Date of birth',
      children: userData?.dateOfBirth,
    },
  ];

  return (
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
            setEditMode(true);
          }}
        />
      </Col>
    </Row>
  );
}

export default ProfileInfoDescription;
