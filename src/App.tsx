import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import router from './utils/router/Router';
import styles from './styles/appStyles';

function App(): JSX.Element {
  return (
    <ConfigProvider theme={styles}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
