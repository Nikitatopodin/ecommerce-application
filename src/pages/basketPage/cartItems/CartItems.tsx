import React from 'react';
import Title from 'antd/es/typography/Title';
import Item from './Item';

function CartItems() {
  return (
    <>
      <Title level={3}>Shopping Cart</Title>
      <Item />
    </>
  );
}

export default CartItems;
