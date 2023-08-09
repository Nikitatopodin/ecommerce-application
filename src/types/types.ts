interface IRegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  birthday: object;
  city: string;
  country: string;
  postalCode: string;
  street: string;
  cityBilling?: string;
  countryBilling?: string;
  postalCodeBilling?: string;
  streetBilling?: string;
}

interface ILogIn {
  email: string;
  password: string;
}

export type { IRegistrationForm, ILogIn };
