import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import Login from '../../pages/Login';
import Registration from '../../pages/RegistrationPage';
import PrivateRoute from './privateRoute';
import HeaderComponent from '../../layouts/header/Header';
import FooterComponent from '../../layouts/footer/Footer';
import { activeMenuItemsReducer } from '../../redux/slices/navMenuSlice';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const activeMenuItem = location.pathname.slice(1);
    dispatch(activeMenuItemsReducer(activeMenuItem));
  }, [location]);
  return (
    <>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Main />} />
      <Route
        path="/login"
        element={
          <PrivateRoute>
            <Login />
          </PrivateRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <PrivateRoute>
            <Registration />
          </PrivateRoute>
        }
      />
    </Route>,
  ),
);

export default router;
