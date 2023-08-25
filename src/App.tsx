import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import router from './utils/router/Router';
import styles from './styles/appStyles';
import initializeAppThunk from './redux/actions/initializeAppThunk';
import { useAppDispatch } from './hooks/hooks';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppThunk);
  }, []);

  return (
    <ConfigProvider theme={styles}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
