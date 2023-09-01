import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { useAppSelector } from '../../../hooks/hooks';

function ProfileInfoDescription() {
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

  return <Descriptions layout="vertical" items={personalInfo} />;
}

export default ProfileInfoDescription;
