import React from 'react';
import { Layout } from 'antd';
import NavComponent from './nav/Nav';

const { Header } = Layout;

export default function HeaderComponent() {
  return (
    <Header style={{ padding: 0 }}>
      <NavComponent />
    </Header>
  );
}
