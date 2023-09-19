import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
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
        <LazyLoadImage
          alt="teammate"
          effect="blur"
          src={picture}
          style={{
            width: '100%',
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
      <Row style={{ marginTop: '.5em' }}>
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
