interface IRegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  birthday: {
    $d: Date;
  };
  city: string;
  country: string;
  postalCode: string;
  street: string;
  cityBilling?: string;
  countryBilling?: string;
  postalCodeBilling?: string;
  streetBilling?: string;
}

export type { IRegistrationForm };
