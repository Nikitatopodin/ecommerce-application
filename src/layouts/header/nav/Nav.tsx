import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { loginReducer } from '../../../redux/slices/authorizationSlice';
import { activeMenuItemsReducer } from '../../../redux/slices/navMenuSlice';
import { getProducts, getProfile } from '../../../services/customerRequests';

const userIconStyle: React.CSSProperties = {
  fontSize: '16px',
};

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-between',
};

const profileStyle: React.CSSProperties = {
  marginLeft: 'auto',
  marginRight: '1vw',
};

const logoStyle: React.CSSProperties = {
  fontSize: '20px',
  marginLeft: '1vw',
  marginRight: 'auto',
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  style?: React.CSSProperties,
  icon?: React.ReactNode,
  className?: string,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
    style,
    className,
  } as MenuItem;
}

const nonAuthSubMenu = getItem(
  '',
  'subMenu',
  profileStyle,
  <UserOutlined style={userIconStyle} />,
  undefined,
  [getItem('Sign In', 'login'), getItem('Sign Up', 'registration')],
);

const authSubMenu = getItem(
  '',
  'subMenu',
  profileStyle,
  <UserOutlined style={userIconStyle} />,
  undefined,
  [getItem('Profile', 'profile'), getItem('Sign Out', 'logout')],
);

const items: MenuProps['items'] = [
  getItem('IN MEMORIES', 'logo', logoStyle, undefined, 'logo'),
  getItem('Home', ''),
  getItem('About us', 'aboutUs'),
  getItem('Catalogue', 'catalogue'),
  getItem('Contacts', 'contacts'),
];

export default function NavComponent(): JSX.Element {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorization = useAppSelector(
    (state) => state.authorization.isAuthorized,
  );
  const activeItem = useAppSelector((state) => state.navMenu.activeKey);
  useEffect(() => {
    setCurrent(activeItem);
  }, [activeItem]);

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logo') {
      dispatch(activeMenuItemsReducer(''));
      setCurrent('');
      navigate('/');
    } else if (e.key === 'profile') {
      getProfile();
    } else if (e.key === 'catalogue') {
      dispatch(activeMenuItemsReducer(e.key));
      setCurrent(e.key);
      navigate(`/catalog`);
    } else if (e.key === 'logout') {
      dispatch(loginReducer(false));
      dispatch(activeMenuItemsReducer(''));
      setCurrent('');
      navigate('/');
      localStorage.removeItem('token');
      message.success('You have successfully signed out');
    } else {
      dispatch(activeMenuItemsReducer(e.key));
      setCurrent(e.key);
      navigate(`/${e.key}`);
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={[...items!, authorization ? authSubMenu : nonAuthSubMenu]}
      style={menuStyle}
    />
  );
}
