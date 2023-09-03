import { BaseAddress } from '@commercetools/platform-sdk';

export interface IAddressValues {
  city: string;
  cityBilling: string;
  country: string;
  countryBilling: 'RU' | 'USA';
  defaultAddress: boolean;
  defaultBillingAddress: boolean;
  postalCode: string;
  postalCodeBilling: string;
  street: string;
  streetBilling: string;
}

function formatAddress(
  isBilling: boolean,
  values: IAddressValues,
  addressId?: string,
) {
  let formattedAddress: BaseAddress;
  if (isBilling) {
    formattedAddress = {
      country: values.countryBilling,
      postalCode: values.postalCodeBilling,
      city: values.cityBilling,
      streetName: values.streetBilling,
      id: addressId && addressId,
    };
  } else {
    formattedAddress = {
      country: values.country,
      postalCode: values.postalCode,
      city: values.city,
      streetName: values.street,
      id: addressId && addressId,
    };
  }
  return formattedAddress;
}

export default formatAddress;
