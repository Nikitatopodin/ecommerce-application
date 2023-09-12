import React from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { Card, Col, InputNumber, Row } from 'antd';
import Title from 'antd/es/typography/Title';

interface IProps {
  item: LineItem;
}

function Item({ item }: IProps) {
  // todo: implement quantity change
  return (
    <Card style={{ width: '95%' }}>
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
          <p>{`${item.totalPrice.centAmount} ${item.totalPrice.currencyCode}`}</p>
          <InputNumber
            min={1}
            max={100}
            defaultValue={item.quantity}
            onChange={(value) => console.log(value)}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Item;
