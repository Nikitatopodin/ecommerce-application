import React from 'react';
import { Layout, Space } from 'antd';
import HeaderComponent from '../layouts/header/header';
import FooterComponent from '../layouts/footer/footer';
import NavComponent from '../layouts/nav/nav';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

function Main(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <HeaderComponent>
          <NavComponent />
        </HeaderComponent>
        <Content style={contentStyle}>Content</Content>
        <FooterComponent>SOCIALS</FooterComponent>
      </Layout>
    </Space>
  );
}

export default Main;
