import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Badge, Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { activeMenuItemsReducer } from '../../../redux/slices/navMenuSlice';
import signOutThunk from '../../../redux/actions/signOutThunk';

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
    getItem('Catalog', 'catalog'),
    getItem('About us', 'about'),
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
    switch (e.key) {
      case 'logo':
        dispatch(activeMenuItemsReducer(''));
        setCurrent('');
        navigate('/');
        break;
      case 'catalog':
        dispatch(activeMenuItemsReducer(e.key));
        setCurrent(e.key);
        navigate(`/catalog`);
        break;
      case 'cart':
        setCurrent(e.key);
        navigate('/cart');
        break;
      case 'logout':
        dispatch(signOutThunk());
        setCurrent('');
        navigate('/');
        break;
      default:
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
