import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CatalogPage from '../pages/CatalogPage';

afterEach(() => {
  cleanup();
});

test('should render catalogPage component', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <CatalogPage />
      </Provider>
    </BrowserRouter>,
  );
  const catalog = screen.getByTestId('catalog');
  expect(catalog).toBeInTheDocument();
  expect(catalog).toHaveTextContent('Price');
});
