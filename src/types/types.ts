interface IRegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm: string;
  dateOfBirth: {
    $d: Date;
  };
  city: string;
  country: string;
  postalCode: string;
  street: string;
  isAddressSingle: boolean;
  defaultShippingAddress: boolean;
  cityBilling?: string;
  countryBilling?: string;
  postalCodeBilling?: string;
  streetBilling?: string;
  defaultBillingAddress?: boolean;
}

interface IConvertedData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: IAddress[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

interface IAddress {
  country: string;
  postalCode: string;
  city: string;
  streetName: string;
}

export type { IRegistrationForm, IConvertedData };
