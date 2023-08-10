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
};

export default formValidation;
