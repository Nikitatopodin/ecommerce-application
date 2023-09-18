import React, { useState } from 'react';
import { Button, Card, Input, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import styles from './SummaryInfo.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import removeCartThunk from '../../../../redux/actions/removeCartThunk';

function SummaryInfo() {
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  const [promoCode, setPromoCode] = useState('');

  return (
    <Card className={styles.summaryCard}>
      <Title level={3} className={styles.title}>
        Summary
      </Title>
      <Row>
        <Text type="secondary" style={{ fontSize: '1em' }}>
          {cart?.totalLineItemQuantity}
          {cart?.totalLineItemQuantity && cart.totalLineItemQuantity > 1
            ? ' items'
            : ' item'}
        </Text>
      </Row>
      <Row>
        <Text type="secondary" style={{ fontSize: '1em', marginBottom: '1em' }}>
          Total: {cart?.totalPrice.centAmount} {cart?.totalPrice.currencyCode}
        </Text>
      </Row>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="Enter a promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button type="primary" onClick={() => console.log(promoCode)}>
          Use promo code
        </Button>
      </Space.Compact>
      <Button style={{ marginTop: 10, marginRight: 10 }} type="primary">
        Checkout
      </Button>
      <Button
        onClick={() => dispatch(removeCartThunk(cart!.version, cart!.id))}
      >
        Clear cart
      </Button>
    </Card>
  );
}

export default SummaryInfo;
