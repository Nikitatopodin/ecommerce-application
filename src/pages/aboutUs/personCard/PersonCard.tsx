import React from 'react';
import { Card, Row } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import styles from './PersonCard.module.css';

interface IPerson {
  name: string;
  role: string;
  about: string;
  githubLink: string;
  picture: string;
}

function PersonCard({ name, role, about, githubLink, picture }: IPerson) {
  return (
    <Card
      className={styles.card}
      cover={
        <img
          alt="teammate"
          src={picture}
          style={{
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            height: 316,
            objectFit: 'cover',
          }}
        />
      }
    >
      <Title level={4} className={styles.about}>
        {name}
      </Title>
      <Text type="secondary" italic>
        {role}
      </Text>
      <Row>
        <Text>{about}</Text>
      </Row>
      <Row className={styles.githubLink}>
        <a href={githubLink}>
          <GithubOutlined />
          <Text type="secondary"> Explore GitHub profile</Text>
        </a>
      </Row>
    </Card>
  );
}

export default PersonCard;
