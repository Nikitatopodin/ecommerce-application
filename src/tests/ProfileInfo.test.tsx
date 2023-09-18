import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import ProfileInfo from '../pages/profilePage/profileInfo/ProfileInfo';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

afterEach(() => {
  cleanup();
});

test('should render ProfileInfo component', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProfileInfo setEditMode={() => {}} />
        );
      </Provider>
    </BrowserRouter>,
  );
  const profileInfo = screen.getByTestId('profileInfo');
  expect(profileInfo).toBeInTheDocument();
  expect(profileInfo).toHaveTextContent('E-mail:');
  expect(profileInfo).toHaveTextContent('Date of birth:');
});
