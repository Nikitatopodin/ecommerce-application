import React from 'react';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';

interface IPerson {
  name: string;
  title: string;
  picture: string;
}

function PersonCard({ name, title, picture }: IPerson) {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="teammate" src={picture} />}
    >
      <Title>{name}</Title>
      <Text>{title}</Text>
    </Card>
  );
}

export default PersonCard;
