import React from 'react';
import { Button, Card, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import styles from './SummaryInfo.module.css';
import { useAppSelector } from '../../../../hooks/hooks';

function SummaryInfo() {
  const cart = useAppSelector((state) => state.cart.cart);

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
      <Button type="primary">Checkout</Button>
    </Card>
  );
}

export default SummaryInfo;
