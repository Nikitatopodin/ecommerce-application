import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ProfilePage from '../pages/profilePage/ProfilePage';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

afterEach(() => {
  cleanup();
});

test('should render profilePage component', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </BrowserRouter>,
  );
  const profilePage = screen.getByTestId('profilePage');
  expect(profilePage).toBeInTheDocument();
  expect(profilePage).toHaveTextContent('Shipping addresses');
});

test('should render NewAddressModal component when press the addAddressButton', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProfilePage />
      </Provider>
    </BrowserRouter>,
  );

  const addAddressButton = screen.getByText('Add new address');
  fireEvent.click(addAddressButton);
  const newAddressModal = screen.getByTestId('newAddressModal');
  expect(newAddressModal).toBeVisible();
});
