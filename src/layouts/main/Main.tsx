import React from 'react';
import { Layout } from 'antd';
import styles from './Main.module.css';
import HomePageCarousel from './carousel/HomePageCarousel';
import PromoCodes from './promoCodes/promoCodes';

const { Content } = Layout;

export default function MainComponent() {
  return (
    <Content className={styles.main}>
      <h3 className={styles.title}>
        POSTCARDS THAT WILL INCREASE YOUR AVERAGE CHECK AND WILL BE REMEMBERED
        BY YOUR CLIENTS
      </h3>
      <HomePageCarousel />
      <PromoCodes />
    </Content>
  );
}
