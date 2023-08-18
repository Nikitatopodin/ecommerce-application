import React from 'react';
import { Space } from 'antd';
import RegistrationForm from '../components/form/registration/RegistrationForm';

function Registration(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <RegistrationForm />
    </Space>
  );
}

export default Registration;
