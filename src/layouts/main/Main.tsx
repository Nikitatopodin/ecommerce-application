import React from 'react';
import { Layout, Typography } from 'antd';
import styles from './Main.module.css';
import HomePageCarousel from './carousel/HomePageCarousel';

const { Content } = Layout;
const { Title } = Typography;

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 400,
  fontSize: '2.5vw',
};

export default function MainComponent() {
  return (
    <Content className={styles.main}>
      <Title style={titleStyle}>
        POSTCARDS THAT WILL INCREASE YOUR AVERAGE CHECK <br />
        AND WILL BE REMEMBERED BY YOUR CLIENTS
      </Title>
      <HomePageCarousel />
    </Content>
  );
}
