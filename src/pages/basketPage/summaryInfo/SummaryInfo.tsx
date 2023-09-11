import React from 'react';
import { Button, Card } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from './SummaryInfo.module.css';

function SummaryInfo() {
  return (
    <Card className={styles.summaryCard}>
      <Title level={3} className={styles.title}>
        Summary
      </Title>
      <p>content</p>
      <p>content</p>
      <p>Total: </p>
      <Button type="primary">Checkout</Button>
    </Card>
  );
}

export default SummaryInfo;
