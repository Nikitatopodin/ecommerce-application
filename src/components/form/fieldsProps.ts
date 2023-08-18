import formValidation from './formValidation';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const fieldsProps = {
  loginForm: {
    props: {
      name: 'login',
      style: {
        maxWidth: 600,
        margin: '30vh auto',
        padding: '5em',
        border: 'solid 1px #f0f0f0',
        borderRadius: 'npm .5em',
      },
      wrapperCol: { span: 16 },
      labelCol: { span: 6 },
      initialValues: { remember: true },
    },
  },
  registrationForm: {
    props: {
      name: 'register',
      ...formItemLayout,
      style: {
        margin: '0 auto',
        maxWidth: 600,
        padding: '10px 50px',
        border: 'solid 1px #f0f0f0',
        borderRadius: '.5em',
      },
      scrollToFirstError: true,
    },
  },
  email: {
    props: {
      name: 'email',
      label: 'E-mail',
      hasFeedback: true,
      rules: formValidation.email,
    },
  },
  password: {
    props: {
      name: 'password',
      label: 'Password',
      hasFeedback: true,
      rules: formValidation.password,
    },
  },
  confirm: {
    props: {
      name: 'confirm',
      label: 'Confirm Password',
      hasFeedback: true,
      dependencies: ['password'],
    },
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
    ],
  },
  firstName: {
    props: {
      name: 'firstName',
      label: 'First name',
      hasFeedback: true,
      rules: [
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
    },
  },
  lastName: {
    props: {
      name: 'lastName',
      label: 'Last name',
      hasFeedback: true,
      rules: [
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
    },
  },
  birthday: {
    props: {
      name: 'birthday',
      label: 'Date of birth',
      hasFeedback: true,
    },
    rules: [
      {
        type: 'object' as const,
        required: true,
        message: 'Please select time!',
      },
    ],
  },
  oneAddress: {
    props: {
      name: 'oneAddress',
      valuePropName: 'checked',
      ...tailFormItemLayout,
    },
  },
  country: {
    props: {
      name: 'country',
      label: 'Country',
      hasFeedback: true,
      rules: formValidation.country,
    },
  },
  postalCode: {
    props: {
      name: 'postalCode',
      label: 'Postal code',
      hasFeedback: true,
      dependencies: ['country'],
    },
    rules: formValidation.postalCode,
  },
  city: {
    props: {
      name: 'city',
      label: 'City',
      hasFeedback: true,
      rules: formValidation.city,
    },
  },
  street: {
    props: {
      name: 'street',
      label: 'Street',
      hasFeedback: true,
      rules: formValidation.street,
    },
  },
  countryBilling: {
    props: {
      name: 'countryBilling',
      label: 'Country',
      hasFeedback: true,
      rules: formValidation.country,
    },
  },
  postalCodeBilling: {
    props: {
      name: 'postalCodeBilling',
      label: 'Postal code',
      hasFeedback: true,
      dependencies: ['countryBilling'],
    },
    rules: formValidation.postalCode,
  },
  cityBilling: {
    props: {
      name: 'cityBilling',
      label: 'City',
      hasFeedback: true,
      rules: formValidation.city,
    },
  },
  streetBilling: {
    props: {
      name: 'streetBilling',
      label: 'Street',
      hasFeedback: true,
      rules: formValidation.street,
    },
  },
};
