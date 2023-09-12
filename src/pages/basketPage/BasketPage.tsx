import React from 'react';
import { Empty } from 'antd';
import { useAppSelector } from '../../hooks/hooks';
import Cart from './cart/Cart';

function BasketPage() {
  const items = useAppSelector((state) => state.cart.cart?.lineItems);

  if (items && items.length > 0) {
    return <Cart />;
  }
  return (
    // todo: add link to catalog page
    <Empty
      description={<span>Your cart is empty</span>}
      style={{ padding: '5em' }}
    />
  );
}

export default BasketPage;
