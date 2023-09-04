import React, { useState } from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import AddressDescription from './AddressDescription';
import UpdateAddressModal from './updateAddressModal/UpdateAddressModal';

interface IProps {
  address: BaseAddress;
  isBilling: boolean;
  isDefault: boolean;
}

function Address({ address, isBilling, isDefault }: IProps) {
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  if (isAddressModalOpen) {
    return (
      <UpdateAddressModal
        address={address}
        isBilling={isBilling}
        isModalOpen={isAddressModalOpen}
        setModalOpen={setAddressModalOpen}
      />
    );
  }
  return (
    <AddressDescription
      address={address}
      isDefault={isDefault}
      setEditMode={setAddressModalOpen}
    />
  );
}

export default Address;
