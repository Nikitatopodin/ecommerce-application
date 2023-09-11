import React from 'react';
import { Card } from 'antd';

interface IProps {
  name: string;
  price: string;
  picture: string;
}

function Item({ name, price, picture }: IProps) {
  return (
    <Card style={{ width: '90%' }}>
      <p>{name}</p>
      <p>{price}</p>
      <img alt="Item" src={picture} style={{ width: '30vw' }} />
    </Card>
  );
}

export default Item;
