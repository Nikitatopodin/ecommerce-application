import { type MyCustomerDraft } from '@commercetools/platform-sdk';
import { IRegistrationForm } from '../types/types';

function convertFormData(data: IRegistrationForm): MyCustomerDraft {
  const addressShipping = {
    country: data.country,
    postalCode: data.postalCode,
    city: data.city,
    streetName: data.street,
  };

  const convertedData = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: new Date(data.birthday.$d).toLocaleDateString('en-CA'),
    addresses: [addressShipping],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
  };

  if (
    data.countryBilling &&
    data.postalCodeBilling &&
    data.cityBilling &&
    data.streetBilling
  ) {
    const addressBilling = {
      country: data.countryBilling,
      postalCode: data.postalCodeBilling,
      city: data.cityBilling,
      streetName: data.streetBilling,
    };
    convertedData.addresses.push(addressBilling);
    convertedData.defaultBillingAddress = 1;
  }

  return convertedData;
}

export default convertFormData;
