import React, { useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import AddressForm from './AddressForm';
import AddressesDescription from './AddressesDescription';

interface IProps {
  address: BaseAddress;
  isBilling: boolean;
  isDefault: boolean;
}

function Addresses({ address, isBilling, isDefault }: IProps) {
  const [isEditMode, setEditMode] = useState(false);

  if (isEditMode) {
    return (
      <AddressForm
        isBilling={isBilling}
        setEditMode={setEditMode}
        address={address}
      />
    );
  }
  return (
    <AddressesDescription
      address={address}
      isDefault={isDefault}
      setEditMode={setEditMode}
    />
  );
}

export default Addresses;
