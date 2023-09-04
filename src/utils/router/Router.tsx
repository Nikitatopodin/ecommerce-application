import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import Catalog from '../../components/catalog/Catalog';
import ErrorPage from '../../pages/ErrorPage';
import LoginPage from '../../pages/LoginPage';
import Registration from '../../pages/registartionPage/RegistrationPage';
import PrivateRoute from './PrivateRoute';
import HeaderComponent from '../../layouts/header/Header';
import FooterComponent from '../../layouts/footer/Footer';
import { activeMenuItemsReducer } from '../../redux/slices/navMenuSlice';
import { useAppDispatch } from '../../hooks/hooks';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import Product from '../../pages/productPage/ProductPage';
import { getProductById } from '../../services/customerRequests';
import PrivateNonAuthRoute from './PrivateNonAuthRoute';

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
      <Route path="/catalog/*" element={<Catalog />} />
      <Route
        path="/profile"
        element={
          <PrivateNonAuthRoute>
            <ProfilePage />
          </PrivateNonAuthRoute>
        }
      />

      <Route
        path="/catalog/:productId"
        element={<Product />}
        loader={async ({ params }) => {
          const data = await getProductById(params.productId!);
          return data.body;
        }}
      />
    </Route>,
  ),
);

export default router;
