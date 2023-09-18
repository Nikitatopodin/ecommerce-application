import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { Card, Col, InputNumber, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './Item.module.css';
import changeProductQuantityThunk from '../../../../../redux/actions/changeProductQuantityThunk';
import removeCartItemThunk from '../../../../../redux/actions/removeCartItemThunk';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';

interface IProps {
  item: LineItem;
}

function Item({ item }: IProps) {
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();
  // todo: implement quantity change

  const removeItem = () => {
    dispatch(
      removeCartItemThunk(
        cart!.version,
        cart!.id,
        item.id,
        item.totalPrice.currencyCode,
        item.totalPrice.centAmount,
        item.quantity,
      ),
    );
  };

  return (
    <Card className={styles.itemCard}>
      <Row>
        <Col span={12}>
          <img
            alt="Item"
            src={item.variant.images![0].url}
            style={{ width: '20vw' }}
          />
        </Col>
        <Col span={12}>
          <Title level={4} style={{ margin: 0 }}>
            {item.name['en-US']}
          </Title>
          <p>
            {(item.totalPrice.centAmount / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
          <InputNumber
            min={1}
            max={100}
            defaultValue={item.quantity}
            onChange={(value) =>
              dispatch(
                changeProductQuantityThunk(
                  cart!.version,
                  item.id,
                  cart!.id,
                  value!,
                ),
              )
            }
          />
          <DeleteOutlined
            className={styles.binIcon}
            onClick={() => removeItem()}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Item;
