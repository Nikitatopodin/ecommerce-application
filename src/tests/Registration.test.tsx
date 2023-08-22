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

test('first name input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const firstNameInput = screen.getByPlaceholderText('First name');

  await act(async () => {
    fireEvent.change(firstNameInput, { target: { value: ' ' } });
  });

  expect(firstNameInput).toHaveValue(' ');
  expect(firstNameInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(firstNameInput, { target: { value: '1' } });
  });

  expect(firstNameInput).toHaveValue('1');
  expect(firstNameInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(firstNameInput, { target: { value: 'Kung Fu' } });
  });

  expect(firstNameInput).toHaveValue('Kung Fu');
  expect(firstNameInput).toBeValid();
});

test('last name input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const lastNameInput = screen.getByPlaceholderText('Last name');

  await act(async () => {
    fireEvent.change(lastNameInput, { target: { value: ' ' } });
  });

  expect(lastNameInput).toHaveValue(' ');
  expect(lastNameInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(lastNameInput, { target: { value: '1' } });
  });

  expect(lastNameInput).toHaveValue('1');
  expect(lastNameInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(lastNameInput, { target: { value: 'Kung Fu' } });
  });

  expect(lastNameInput).toHaveValue('Kung Fu');
  expect(lastNameInput).toBeValid();
});

test('postal code input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });

  const countryInput = screen.getByLabelText('Country');
  const postalCodeInput = screen.getByPlaceholderText('Postal code');

  await act(async () => {
    fireEvent.change(countryInput, { target: { value: 0 } });
    fireEvent.change(postalCodeInput, { target: { value: '12345' } });
  });

  expect(countryInput).toBeValid();
  expect(postalCodeInput).toHaveValue('12345');
  expect(postalCodeInput).toBeValid();

  await act(async () => {
    fireEvent.change(countryInput, { target: { value: 1 } });
    fireEvent.change(postalCodeInput, { target: { value: '123456' } });
  });

  expect(countryInput).toBeValid();
  expect(postalCodeInput).toHaveValue('123456');
  expect(postalCodeInput).toBeValid();
});

test('city input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const cityInput = screen.getByPlaceholderText('City');

  await act(async () => {
    fireEvent.change(cityInput, { target: { value: ' ' } });
  });

  expect(cityInput).toHaveValue(' ');
  expect(cityInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(cityInput, { target: { value: '' } });
  });

  expect(cityInput).toHaveValue('');
  expect(cityInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(cityInput, { target: { value: '@' } });
  });

  expect(cityInput).toHaveValue('@');
  expect(cityInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(cityInput, { target: { value: '1' } });
  });

  expect(cityInput).toHaveValue('1');
  expect(cityInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(cityInput, { target: { value: 'New York' } });
  });

  expect(cityInput).toHaveValue('New York');
  expect(cityInput).toBeValid();
});

test('street input and validation', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Registration />
        </Provider>
      </BrowserRouter>,
    );
  });
  const streetInput = screen.getByPlaceholderText('Street');

  await act(async () => {
    fireEvent.change(streetInput, { target: { value: ' ' } });
  });

  expect(streetInput).toHaveValue(' ');
  expect(streetInput).toBeInvalid();

  await act(async () => {
    fireEvent.change(streetInput, { target: { value: '1' } });
  });

  expect(streetInput).toHaveValue('1');
  expect(streetInput).toBeValid();

  await act(async () => {
    fireEvent.change(streetInput, { target: { value: '5-Ave' } });
  });

  expect(streetInput).toHaveValue('5-Ave');
  expect(streetInput).toBeValid();
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
  const signupButton = screen.getByText('Sign Up');
  const loginButton = screen.getByText('Sign In');
  loginButton.onclick = () => clickHandler();
  signupButton.onclick = () => clickHandler();

  await act(async () => {
    fireEvent.click(loginButton);
    fireEvent.click(loginButton);
    fireEvent.click(signupButton);
    fireEvent.click(signupButton);
    fireEvent.click(signupButton);
  });

  expect(clickHandler).toHaveBeenCalledTimes(5);
});
