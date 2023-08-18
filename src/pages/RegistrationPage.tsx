import React from 'react';
import { Layout, Space } from 'antd';
import RegistrationForm from '../components/form/registration/RegistrationForm';

function Registration(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <RegistrationForm />
      </Layout>
    </Space>
  );
}

export default Registration;
