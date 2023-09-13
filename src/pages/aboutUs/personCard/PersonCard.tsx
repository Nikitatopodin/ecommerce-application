import React from 'react';
import { Card, Row } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
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
      className={styles.card}
      cover={
        <img
          alt="teammate"
          src={picture}
          style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        />
      }
    >
      <Title level={4} className={styles.title}>
        {name}
      </Title>
      <Text>{title}</Text>
      <Row className={styles.githubLink}>
        <a href="https://github.com/MashaBogdanova">
          <GithubOutlined />
          <Text type="secondary"> Explore GitHub profile</Text>
        </a>
      </Row>
    </Card>
  );
}

export default PersonCard;
