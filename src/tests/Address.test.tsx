import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Address from '../pages/profilePage/addresses/Address';
import { BaseAddress } from '@commercetools/platform-sdk';

afterEach(() => {
  cleanup();
});

const address: BaseAddress = {
  id: '1',
  country: 'USA',
  city: 'New-York',
};

test('should render AddressCard component with passed props', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Address address={address} isBilling={false} isDefault={false} />
      </Provider>
    </BrowserRouter>,
  );
  const profileInfo = screen.getByTestId('1');
  expect(profileInfo).toBeInTheDocument();
  expect(profileInfo).toHaveTextContent('USA');
  expect(profileInfo).toHaveTextContent('New-York');
});

test('should render AddressCard with default address badge', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Address address={address} isBilling={false} isDefault={true} />
      </Provider>
    </BrowserRouter>,
  );
  const defaultAddressBadge = screen.getByText('Default');
  expect(defaultAddressBadge).toBeInTheDocument();
});
