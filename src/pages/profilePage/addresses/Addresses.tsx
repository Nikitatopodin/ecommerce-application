import React from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import AddressesForm from './AddressesForm';
import AddressesDescription from './AddressesDescription';

interface IProps {
  address: BaseAddress;
  isDefault: boolean;
  isAddressesEditMode: boolean;
  setAddressesEditMode: (isAddressesEditMode: boolean) => void;
}

function Addresses({
  address,
  isDefault,
  isAddressesEditMode,
  setAddressesEditMode,
}: IProps) {
  if (isAddressesEditMode) {
    return <AddressesForm setEditMode={setAddressesEditMode} />;
  }
  return <AddressesDescription address={address} isDefault={isDefault} />;
}

export default Addresses;
