import { QueryParam } from '@commercetools/platform-sdk';

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

interface IProductQueryArgs {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter: string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
}

export type { IRegistrationForm, IConvertedData, IProductQueryArgs };
