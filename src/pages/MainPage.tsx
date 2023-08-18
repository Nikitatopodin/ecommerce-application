import React from 'react';
import { Layout, Space } from 'antd';
import MainComponent from '../layouts/main/Main';

function Main(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <MainComponent />
    </Space>
  );
}

export default Main;
