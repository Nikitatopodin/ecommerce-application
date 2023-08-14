import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './nav.css';
import { useNavigate } from 'react-router-dom';

const userIconStyle: React.CSSProperties = {
  fontSize: '24px',
  color: '#000',
};

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-between',
};

const profileStyle: React.CSSProperties = {
  marginLeft: 'auto',
};

const logoStyle: React.CSSProperties = {
  color: '#000',
  fontSize: '20px',
  marginRight: 'auto',
};

const items: MenuProps['items'] = [
  {
    label: 'IN MEMORIES',
    key: 'logo',
    style: logoStyle,
    className: 'logo',
  },
  {
    label: 'Home',
    key: '/',
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
            label: 'Log in',
            key: 'login',
          },
          {
            label: 'Sign up',
            key: 'registration',
          },
        ],
      },
    ],
  },
];

export default function NavComponent(): JSX.Element {
  const [current, setCurrent] = useState('/');

  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logo') {
      setCurrent('/');
      navigate('/');
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
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
