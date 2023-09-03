import { type MyCustomerDraft } from '@commercetools/platform-sdk';
import { IConvertedData, IRegistrationForm } from '../../types/types';

function convertFormData(data: IRegistrationForm): MyCustomerDraft {
  const addressShipping = {
    country: data.country,
    postalCode: data.postalCode,
    city: data.city,
    streetName: data.street,
  };

  const convertedData: IConvertedData = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: new Date(data.dateOfBirth.$d).toLocaleDateString('en-CA'),
    addresses: data.isAddressSingle
      ? [addressShipping, addressShipping]
      : [addressShipping],
  };

  if (data.defaultShippingAddress) {
    convertedData.defaultShippingAddress = 0;
    if (data.isAddressSingle !== false) {
      convertedData.defaultBillingAddress = 0;
    }
  }

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

    if (data.defaultBillingAddress) {
      convertedData.defaultBillingAddress = 1;
    }
  }

  return convertedData;
}

export default convertFormData;
