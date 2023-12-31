import formValidation from './formValidation';

export const formItemLayout = {
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
      span: 18,
      offset: 6,
    },
  },
};

export const errorLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

const formStyle = {
  maxWidth: 600,
  margin: '5vh auto',
  padding: '2.5em 3em',
  border: 'solid 1px #f0f0f0',
  borderRadius: '.5em',
  backgroundColor: 'white',
};

export const fieldsProps = {
  loginForm: {
    props: {
      name: 'login',
      style: formStyle,
      wrapperCol: { span: 16 },
      labelCol: { span: 6 },
      initialValues: { remember: true },
    },
  },
  registrationForm: {
    props: {
      name: 'register',
      ...formItemLayout,
      style: formStyle,
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
  currentPassword: {
    props: {
      name: 'currentPassword',
      label: 'Current Password',
      hasFeedback: true,
      rules: formValidation.password,
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
      rules: formValidation.firstName,
    },
  },
  lastName: {
    props: {
      name: 'lastName',
      label: 'Last name',
      hasFeedback: true,
      rules: formValidation.lastName,
    },
  },
  dateOfBirth: {
    props: {
      name: 'dateOfBirth',
      label: 'Date of birth',
      hasFeedback: true,
    },
    rules: formValidation.dateOfBirth,
  },
  isAddressSingle: {
    props: {
      name: 'isAddressSingle',
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
  defaultShippingAddress: {
    props: {
      name: 'defaultShippingAddress',
      valuePropName: 'checked',
      ...tailFormItemLayout,
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
  defaultBillingAddress: {
    props: {
      name: 'defaultBillingAddress',
      valuePropName: 'checked',
      ...tailFormItemLayout,
    },
  },
};
