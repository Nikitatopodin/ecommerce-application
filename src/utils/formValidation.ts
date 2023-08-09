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
    { min: 8, message: 'Password must be at least 8 characters long' },
    {
      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      message:
        'Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character',
    },
    {
      pattern: /^\S(?:.*\S)?$/,
      message: 'Password must not contain leading or trailing whitespace',
    },
  ],
};

export default formValidation;
