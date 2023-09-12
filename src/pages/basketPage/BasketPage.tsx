import React from 'react';
import { Col, Empty, Row } from 'antd';
import CartItems from './cartItems/CartItems';
import SummaryInfo from './summaryInfo/SummaryInfo';
import { useAppSelector } from '../../hooks/hooks';

function BasketPage() {
  const items = useAppSelector((state) => state.cart.cart?.lineItems);
  if (items && items.length > 0) {
    return (
      <Row style={{ padding: '1em' }}>
        <Col span={15}>
          <CartItems />
        </Col>
        <Col span={9}>
          <SummaryInfo />
        </Col>
      </Row>
    );
  }
  return (
    <Empty
      description={<span>Your cart is empty</span>}
      style={{ padding: '5em' }}
    />
  );
}

export default BasketPage;
