import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#f5f5f5',
};

interface IHeaderProps {
  children: React.ReactNode;
}

export default function HeaderComponent(props: IHeaderProps) {
  const { children } = props;

  return <Header style={headerStyle}>{children}</Header>;
}
