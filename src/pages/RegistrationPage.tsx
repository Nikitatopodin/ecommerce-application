import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '../layouts/header/header';
import FooterComponent from '../layouts/footer/footer';
import RegistrationForm from '../components/form/registration/RegistrationForm';

function Registration(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent />
        <RegistrationForm />
        <FooterComponent />
      </Layout>
    </Space>
  );
}

export default Registration;
