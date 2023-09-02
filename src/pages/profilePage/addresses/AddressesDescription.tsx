import React from 'react';
import { Badge, Button, Card, Descriptions, DescriptionsProps } from 'antd';
import { BaseAddress } from '@commercetools/platform-sdk';
import removeAddressThunk from '../../../redux/actions/removeAddressThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

interface IDescriptionProps {
  address: BaseAddress;
  isDefault: boolean;
  setEditMode: (isEditMode: boolean) => void;
}

interface ICardProps {
  setEditMode: (isEditMode: boolean) => void;
  address: BaseAddress;
}

function AddressCard({ setEditMode, address }: ICardProps) {
  const version = useAppSelector(
    (state) => state.authorization.userData?.version,
  );
  const dispatch = useAppDispatch();

  const addresses: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Postal code',
      children: address.postalCode,
    },
    {
      key: '2',
      label: 'Country',
      children: address.country === 'RU' ? 'Russia' : 'USA',
    },
    {
      key: '3',
      label: 'City',
      children: address.city,
    },
    {
      key: '4',
      label: 'Street',
      children: address.streetName,
    },
  ];
  return (
    <Card size="small" style={{ marginTop: '.5em' }}>
      <Descriptions layout="vertical" items={addresses} />
      <Button type="link" onClick={() => setEditMode(true)}>
        Change address
      </Button>
      <Button
        type="link"
        onClick={() => {
          if (address.id && version) {
            dispatch(removeAddressThunk(address.id, version));
          }
        }}
      >
        Delete address
      </Button>
    </Card>
  );
}

function AddressesDescription({
  address,
  isDefault,
  setEditMode,
}: IDescriptionProps) {
  if (isDefault) {
    return (
      <Badge.Ribbon text="Default" color="green">
        <AddressCard setEditMode={setEditMode} address={address} />
      </Badge.Ribbon>
    );
  }
  return <AddressCard setEditMode={setEditMode} address={address} />;
}

export default AddressesDescription;
