import React from 'react';
import { Layout } from 'antd';
import { InstagramOutlined, MailOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

export default function FooterComponent() {
  return (
    <Footer style={footerStyle}>
      <a href="mailto:in-memories@mail.ru">
        <MailOutlined /> in-memories@mail.ru
      </a>
      <div>
        <a href="https://www.instagram.com/in.memories_opt/">
          <InstagramOutlined /> @in.memories_opt
        </a>
      </div>
    </Footer>
  );
}
