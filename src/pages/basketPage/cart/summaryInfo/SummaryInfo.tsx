import React, { useState } from 'react';
import { Button, Card, Input, Row, Space, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import styles from './SummaryInfo.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { usePromoCode } from '../../../../services/customerRequests';
import { updateCartReducer } from '../../../../redux/slices/cartSlice';
import removeCartThunk from '../../../../redux/actions/removeCartThunk';

function SummaryInfo() {
  const { cart } = useAppSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useAppDispatch();

  const useDiscount = () => {
    console.log(cart);
    usePromoCode(cart!.id, cart!.version, promoCode)
      .then((response) => {
        dispatch(updateCartReducer(response.body));
      })
      .catch(() => {
        message.error('Please enter the current promo code');
      });
  };

  const initialTotalPrice = () => {
    let total = 0;
    cart?.lineItems.forEach((item) => {
      total += item.price.value.centAmount * item.quantity;
    });
    return total;
  };

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
          Total:{' '}
          {(cart!.totalPrice.centAmount / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}{' '}
          {cart!.totalPrice.centAmount !== initialTotalPrice() && (
            <span className={styles.oldPrice}>
              {(initialTotalPrice() / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          )}
        </Text>
      </Row>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button type="primary" onClick={useDiscount}>
          <CheckOutlined />
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
