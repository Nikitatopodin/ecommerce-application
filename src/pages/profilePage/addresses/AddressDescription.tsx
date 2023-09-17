import React from 'react';
import { Badge, Button, Card, Row, Typography } from 'antd';
import { BaseAddress } from '@commercetools/platform-sdk';
import removeAddressThunk from '../../../redux/actions/removeAddressThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const { Text } = Typography;

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

  return (
    <Card
      size="small"
      style={{ marginTop: '.5em', margin: 'auto', paddingLeft: '1em' }}
      data-testid={address.id}
    >
      <Row>
        <Text type="secondary" italic>
          {address.postalCode}
        </Text>
      </Row>
      <Row>
        <Text type="secondary" italic>
          {address.country === 'RU' ? 'Russia' : 'USA'}, {address.city}
        </Text>
      </Row>
      <Row>
        <Text type="secondary" italic>
          {address.streetName}
        </Text>
      </Row>
      <Button
        type="link"
        onClick={() => setEditMode(true)}
        style={{ padding: 0 }}
      >
        Edit
      </Button>
      <Button
        type="link"
        onClick={() => {
          if (address.id && version) {
            dispatch(removeAddressThunk(address.id, version));
          }
        }}
      >
        Delete
      </Button>
    </Card>
  );
}

function AddressDescription({
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

export default AddressDescription;
