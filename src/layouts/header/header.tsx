import React from 'react';
import { Layout } from 'antd';
import NavComponent from './nav/nav';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  color: '#000',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#f5f5f5',
};

export default function HeaderComponent() {
  return (
    <Header style={headerStyle}>
      <NavComponent />
    </Header>
  );
}
