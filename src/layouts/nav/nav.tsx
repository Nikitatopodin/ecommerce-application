import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const userIconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#000',
};

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
};

const profileStyle: React.CSSProperties = {
  marginLeft: 'auto',
};

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home',
  },
  {
    label: 'About us',
    key: 'about_us',
  },
  {
    label: 'Catalogue',
    key: 'catalogue',
  },
  {
    label: 'Contacts',
    key: 'contacts',
  },
  {
    key: 'SubMenu',
    style: profileStyle,
    icon: <UserOutlined style={userIconStyle} />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Profile',
            key: 'profile',
          },
          {
            label: 'Log in',
            key: 'setting:1',
          },
          {
            label: 'Sign up',
            key: 'setting:2',
          },
        ],
      },
    ],
  },
];

export default function NavComponent(): JSX.Element {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={menuStyle}
    />
  );
}
