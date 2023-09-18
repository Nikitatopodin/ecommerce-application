import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from 'react-router-dom';
import Main from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import Registration from '../../pages/registrationPage/RegistrationPage';
import PrivateRoute from './PrivateRoute';
import HeaderComponent from '../../layouts/header/Header';
import FooterComponent from '../../layouts/footer/Footer';
import { activeMenuItemsReducer } from '../../redux/slices/navMenuSlice';
import { useAppDispatch } from '../../hooks/hooks';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import ProductPage from '../../pages/productPage/ProductPage';
import { getProductById } from '../../services/customerRequests';
import PrivateNonAuthRoute from './PrivateNonAuthRoute';
import CatalogPage from '../../pages/CatalogPage';
import BasketPage from '../../pages/basketPage/BasketPage';
import AboutUsPage from '../../pages/aboutUs/AboutUsPage';
import styles from './index.module.css';

function Layout() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    const activeMenuItem = location.pathname.slice(1);
    dispatch(activeMenuItemsReducer(activeMenuItem));
  }, [location]);
  return (
    <div className={styles.main}>
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </div>
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
      <Route path="/catalog" element={<CatalogPage />} />
      <Route
        path="/profile"
        element={
          <PrivateNonAuthRoute>
            <ProfilePage />
          </PrivateNonAuthRoute>
        }
      />
      <Route
        path="/catalog"
        element={
          <PrivateNonAuthRoute>
            <CatalogPage />
          </PrivateNonAuthRoute>
        }
      />
      <Route path="/cart" element={<BasketPage />} />

      <Route
        index
        path="catalog/:productId"
        element={<ProductPage />}
        loader={async ({ params }) => {
          const data = await getProductById(params.productId!);
          return data.body;
        }}
      />
      <Route path="/about" element={<AboutUsPage />} />
    </Route>,
  ),
);

export default router;
