import React, { useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProfileInfoForm from './profileInfo/ProfileInfoForm';
import ProfileInfoDescription from './profileInfo/ProfileInfoDescription';
import { useAppSelector } from '../../hooks/hooks';
import Addresses from './addresses/Addresses';

interface IDividerProps {
  title: string;
  setEditMode: (isEditMode: boolean) => void;
}

function FieldsDivider({ title, setEditMode }: IDividerProps) {
  return (
    <Row gutter={12}>
      <Col span={20}>
        <Divider orientation="left">{title}</Divider>
      </Col>
      <Col span={4}>
        <EditOutlined
          style={{ marginTop: '1.2em', color: '#4f4f4f' }}
          onClick={() => {
            setEditMode(true);
          }}
        />
      </Col>
    </Row>
  );
}

function ProfilePage() {
  const [isPersonalDataEditMode, setPersonalDataEditMode] = useState(false);
  const [isAddressesEditMode, setAddressesEditMode] = useState(false);

  const addresses = useAppSelector(
    (state) => state.authorization.userData?.addresses,
  );
  const shippingAddressIds = useAppSelector(
    (state) => state.authorization.userData?.shippingAddressIds,
  );
  const billingAddressIds = useAppSelector(
    (state) => state.authorization.userData?.billingAddressIds,
  );
  const defaultShippingAddress = useAppSelector(
    (state) => state.authorization.userData?.defaultShippingAddressId,
  );
  const defaultBillingAddress = useAppSelector(
    (state) => state.authorization.userData?.defaultBillingAddressId,
  );

  return (
    <Row justify="center" style={{ marginTop: '1em' }}>
      <Col span={12}>
        <>
          <FieldsDivider
            title="Personal Info"
            setEditMode={setPersonalDataEditMode}
          />

          {isPersonalDataEditMode ? (
            <ProfileInfoForm setEditMode={setPersonalDataEditMode} />
          ) : (
            <ProfileInfoDescription />
          )}

          <FieldsDivider
            title="Shipping addresses"
            setEditMode={setAddressesEditMode}
          />

          {addresses?.map(
            (address) =>
              shippingAddressIds?.includes(address.id as string) && (
                <Addresses
                  address={address}
                  isDefault={defaultShippingAddress === address.id}
                  isAddressesEditMode={isAddressesEditMode}
                  setAddressesEditMode={setAddressesEditMode}
                />
              ),
          )}

          {billingAddressIds!.length > 0 && (
            <>
              <FieldsDivider
                title="Billing addresses"
                setEditMode={setAddressesEditMode}
              />

              {addresses?.map(
                (address) =>
                  billingAddressIds?.includes(address.id as string) && (
                    <Addresses
                      address={address}
                      isDefault={defaultBillingAddress === address.id}
                      isAddressesEditMode={isAddressesEditMode}
                      setAddressesEditMode={setAddressesEditMode}
                    />
                  ),
              )}
            </>
          )}
        </>
      </Col>
    </Row>
  );
}

export default ProfilePage;
