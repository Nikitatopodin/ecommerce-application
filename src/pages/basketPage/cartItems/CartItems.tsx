import React from 'react';
import Title from 'antd/es/typography/Title';
import Item from './Item';
import { useAppSelector } from '../../../hooks/hooks';

function CartItems() {
  const items = useAppSelector((state) => state.cart.cart?.lineItems);
  console.log('cart', items);
  return (
    <>
      <Title level={3}>Shopping Cart</Title>
      {items?.map((item) => {
        return <Item item={item} key={item.id} />;
      })}
    </>
  );
}

export default CartItems;
