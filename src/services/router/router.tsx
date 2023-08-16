import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/registration" element={<h1>Registration</h1>} />
    </>,
  ),
);

export default router;
