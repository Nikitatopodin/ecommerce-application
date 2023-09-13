import React from 'react';
import { Col, Row } from 'antd';
import CartItems from './cartItems/CartItems';
import SummaryInfo from './summaryInfo/SummaryInfo';
import styles from './Cart.module.css';

function Cart() {
  return (
    <Row className={styles.cart}>
      <Col>
        <CartItems />
      </Col>
      <Col>
        <SummaryInfo />
      </Col>
    </Row>
  );
}

export default Cart;
