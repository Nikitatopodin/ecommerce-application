import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './utils/router/Router';

function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
