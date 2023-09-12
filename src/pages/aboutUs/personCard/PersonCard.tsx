import React from 'react';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import styles from './PersonCard.module.css';

interface IPerson {
  name: string;
  title: string;
  picture: string;
}

function PersonCard({ name, title, picture }: IPerson) {
  return (
    <Card
      hoverable
      className={styles.card}
      cover={
        <img
          alt="teammate"
          src={picture}
          style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        />
      }
    >
      <Title level={3}>{name}</Title>
      <Text>{title}</Text>
    </Card>
  );
}

export default PersonCard;
