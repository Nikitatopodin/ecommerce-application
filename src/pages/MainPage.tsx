import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '../layouts/header/header';
import FooterComponent from '../layouts/footer/footer';
import MainComponent from '../layouts/main/main';

function Main(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent />
        <MainComponent />
        <FooterComponent />
      </Layout>
    </Space>
  );
}

export default Main;
