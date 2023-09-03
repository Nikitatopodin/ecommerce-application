interface IFormValidation {
  [key: string]: {
    [key: string]: string | number | boolean | RegExp;
  }[];
}

const formValidation: IFormValidation = {
  email: [
    { required: true, message: 'Please input your e-mail' },
    { type: 'email', message: 'Please enter a valid email address' },
  ],
  password: [
    { required: true, message: 'Please input your password' },
    {
      min: 8,
      message:
        'Your password needs to be a bit longer, please use at least 8 characters',
    },
    {
      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      message:
        'Your password should be a bit more complex. Make sure it includes at least one lowercase letter, one uppercase letter, one digit, and one special character',
    },
    {
      pattern: /^\S(?:.*\S)?$/,
      message:
        'Password must not contain leading or trailing whitespace. Please make sure to remove any spaces and try again.',
    },
  ],
  firstName: [
    {
      required: true,
      message: 'Please input your first name',
      whitespace: true,
    },
    {
      pattern: /^[a-zA-Z ]+$/,
      message:
        'First name you entered contains invalid characters. Please ensure that it only contains alphabetic characters (A-Z or a-z) and try again',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Please input your last name',
      whitespace: true,
    },
    {
      pattern: /^[a-zA-Z ]+$/,
      message:
        'Last name you entered contains invalid characters. Please ensure that it only contains alphabetic characters (A-Z or a-z) and try again',
    },
  ],
  dateOfBirth: [
    {
      type: 'object' as const,
      required: true,
      message: 'Please select time!',
    },
  ],
  country: [
    {
      required: true,
      message: 'Please select your country!',
    },
  ],
  postalCode: [
    {
      required: true,
      message: 'Please input postal code',
      whitespace: true,
    },
    {
      pattern: /^[0-9]+$/,
      message:
        'The postal code you entered contains invalid characters. Please make sure it consists of only digits (0-9) and does not include any letters, symbols, or spaces',
    },
  ],
  city: [
    {
      required: true,
      message: 'Please input city',
      whitespace: true,
    },
    {
      pattern: /^[a-zA-Z- ]+$/,
      message:
        'The city name you entered contains invalid characters. Please ensure that it only consists of alphabetic characters (A-Z or a-z) and does not include any numbers, symbols, or special characters',
    },
  ],
  street: [
    {
      required: true,
      message: 'Please input street',
      whitespace: true,
    },
    {
      pattern: /^[a-zA-Z0-9-'" ]+$/,
      message:
        'The street name you entered contains invalid characters. Please make sure it consists of letters and/or digits (A-Z, a-z, or 0-9) without any special characters or symbols',
    },
  ],
};

export default formValidation;
