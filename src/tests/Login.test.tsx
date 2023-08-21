import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Login from '../pages/LoginPage';
import { store } from '../redux/store';

test('e-mail input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
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

test('password input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
  });

  const passwordInput = screen.getByPlaceholderText('Password');

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: 'hello' } });
  });

  expect(passwordInput).toHaveValue('hello');
  expect(passwordInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: '' } });
  });

  expect(passwordInput).toHaveValue('');
  expect(passwordInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: 'Hello1' } });
  });

  expect(passwordInput).toHaveValue('Hello1');
  expect(passwordInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(passwordInput, { target: { value: 'GoodPassword1!' } });
  });

  expect(passwordInput).toHaveValue('GoodPassword1!');
  expect(passwordInput).toBeValid();
});

test('reset button works properly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
  });

  const clickHandler = jest.fn();
  const resetButton = screen.getByText('Reset');
  resetButton.onclick = () => clickHandler();

  await act(async () => {
    fireEvent.click(resetButton);
    fireEvent.click(resetButton);
  });

  expect(clickHandler).toHaveBeenCalledTimes(2);
});

test('reset button works properly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>,
    );
  });

  const clickHandler = jest.fn();
  const logInButton = screen.getAllByText('Log in');
  logInButton[0].onclick = () => clickHandler();

  await act(async () => {
    fireEvent.click(logInButton[0]);
    fireEvent.click(logInButton[0]);
  });

  expect(clickHandler).toHaveBeenCalledTimes(2);
});
