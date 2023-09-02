import React, { useEffect } from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  Outlet,
  useLocation,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import LoginPage from '../../pages/LoginPage';
import Registration from '../../pages/registartionPage/RegistrationPage';
import Catalog from '../../components/catalog/Catalog';
import PrivateRoute from './PrivateRoute';
import HeaderComponent from '../../layouts/header/Header';
import FooterComponent from '../../layouts/footer/Footer';
import { activeMenuItemsReducer } from '../../redux/slices/navMenuSlice';
import { useAppDispatch } from '../../hooks/hooks';
import ProfilePage from '../../pages/profilePage/ProfilePage';

function Layout() {
  const dispatch = useAppDispatch();
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
            <LoginPage />
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
      <Route
        path="/catalog"
        element={
          <PrivateRoute>
            <Catalog />
          </PrivateRoute>
        }
      />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>,
  ),
);

export default router;
