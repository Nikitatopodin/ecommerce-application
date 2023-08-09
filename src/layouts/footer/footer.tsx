import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

interface IFooterProps {
  children: React.ReactNode;
}

export default function FooterComponent(props: IFooterProps) {
  const { children } = props;

  return <Footer style={footerStyle}>{children}</Footer>;
}
