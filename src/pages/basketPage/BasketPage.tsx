import React from 'react';
import { Col, Row } from 'antd';
import CartItems from './cartItems/CartItems';
import SummaryInfo from './summaryInfo/SummaryInfo';

function BasketPage() {
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

export default BasketPage;
