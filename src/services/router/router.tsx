import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/Login';
import Registration from '../../pages/registration/Registration';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Main />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </>,
  ),
);

export default router;
