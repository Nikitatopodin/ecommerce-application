import React, { useEffect, useState } from 'react';
import Text from 'antd/es/typography/Text';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Row } from 'antd';
import { useAppSelector } from '../../hooks/hooks';
import Cart from './cart/Cart';

function BasketPage() {
  const items = useAppSelector((state) => state.cart.cart?.lineItems);
  const [isNavigate, setNavigate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isNavigate) {
      navigate('/catalog');
    }
  }, [isNavigate]);
  console.log(items);
  if (items && items.length > 0) {
    return <Cart />;
  }

  return (
    <Empty
      description={
        <>
          <Text type="secondary">Your cart is empty. Start shopping!</Text>
          <Row justify="center" style={{ margin: '1em' }}>
            <Button onClick={() => setNavigate(true)}>Start</Button>
          </Row>
        </>
      }
      style={{ padding: '5em' }}
    />
  );
}

export default BasketPage;
