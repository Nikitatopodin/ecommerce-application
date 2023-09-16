import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Badge, Menu, message } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { loginReducer } from '../../../redux/slices/authorizationSlice';
import { activeMenuItemsReducer } from '../../../redux/slices/navMenuSlice';
import { updateCartReducer } from '../../../redux/slices/cartSlice';

const userIconStyle: React.CSSProperties = {
  fontSize: 16,
};
const basketIconStyle: React.CSSProperties = {
  fontSize: 17,
};
const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-between',
};
const profileStyle: React.CSSProperties = {
  marginRight: '1vw',
};
const basketStyle: React.CSSProperties = {
  marginLeft: 'auto',
  marginRight: 0,
  padding: '0px 0px 0px 10px',
};
const logoStyle: React.CSSProperties = {
  fontSize: 20,
  marginLeft: '1vw',
  marginRight: 'auto',
};

type MenuItem = Required<MenuProps>['items'][number];

export default function NavComponent(): JSX.Element {
  const [current, setCurrent] = useState('/');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(
    (state) => state.authorization.isAuthorized,
  );
  const cartItemsCount = useAppSelector(
    (state) => state.cart.cart?.totalLineItemQuantity,
  );
  const activeItem = useAppSelector((state) => state.navMenu.activeKey);

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
    getItem('About us', 'about'),
    getItem('Catalog', 'catalog'),
    getItem('Contacts', 'contacts'),
  ];

  const cart = getItem(
    '',
    'cart',
    basketStyle,
    <Badge
      count={cartItemsCount}
      size="small"
      color="#52c41a"
      style={{
        fontSize: '10px',
        fontWeight: 'bold',
        lineHeight: '8px',
        padding: 3,
      }}
    >
      <ShoppingCartOutlined style={basketIconStyle} />
    </Badge>,
  );

  useEffect(() => {
    setCurrent(activeItem);
  }, [activeItem]);

  const onClick: MenuProps['onClick'] = (e) => {
    // todo: поменять на switch
    if (e.key === 'logo') {
      dispatch(activeMenuItemsReducer(''));
      setCurrent('');
      navigate('/');
    } else if (e.key === 'catalog') {
      dispatch(activeMenuItemsReducer(e.key));
      setCurrent(e.key);
      navigate(`/catalog`);
    } else if (e.key === 'cart') {
      setCurrent(e.key);
      navigate('/cart');
    } else if (e.key === 'logout') {
      // todo: инкапсулировать логику в thunk
      dispatch(loginReducer({ isAuthorized: false, userData: null }));
      dispatch(updateCartReducer({ cart: null }));
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
      items={[...items!, cart, isAuthorized ? authSubMenu : nonAuthSubMenu]}
      style={menuStyle}
    />
  );
}
