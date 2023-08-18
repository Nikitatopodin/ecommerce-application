import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Registration from '../pages/RegistrationPage';
import { store } from '../redux/store';

test('e-mail input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const emailInput = screen.getByPlaceholderText('E-mail');

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'hello' } });
  });

  expect(emailInput).toHaveValue('hello');
  expect(emailInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: '' } });
  });

  expect(emailInput).toHaveValue('');
  expect(emailInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'test123@gmail.com' } });
  });

  expect(emailInput).toHaveValue('test123@gmail.com');
  expect(emailInput).toBeValid();
});

test('password and confirm password', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: 'password1' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'GoodPassword1!' },
    });
  });
  expect(passwordInput).toBeInvalid();
  expect(confirmPasswordInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: '' } });
  });
  expect(passwordInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: 'GoodPassword1!' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'GoodPassword1!' },
    });
  });
  expect(passwordInput).toBeValid();
  expect(confirmPasswordInput).toBeValid();
});

test('buttons onclick works', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const clickHandler = jest.fn();
  const registerButton = screen.getByText('Register');
  const loginButton = screen.getByText('Log in');
  loginButton.onclick = () => clickHandler();
  registerButton.onclick = () => clickHandler();

  await act(async () => {
    fireEvent.click(loginButton);
    fireEvent.click(loginButton);
    fireEvent.click(registerButton);
    fireEvent.click(registerButton);
    fireEvent.click(registerButton);
  });

  expect(clickHandler).toHaveBeenCalledTimes(5);
});
