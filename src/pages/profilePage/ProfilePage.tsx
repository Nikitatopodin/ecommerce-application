import React, { useState } from 'react';
import { Col, Divider, Row } from 'antd';
import ProfileInfoForm from './profileInfo/ProfileInfoForm';
import ProfileInfoDescription from './profileInfo/ProfileInfoDescription';
import { useAppSelector } from '../../hooks/hooks';
import Addresses from './addresses/Addresses';

function ProfilePage() {
  const [isPersonalDataEditMode, setPersonalDataEditMode] = useState(false);

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
    <Row justify="center" style={{ margin: '1em auto' }}>
      <Col span={12}>
        <>
          <Divider orientation="left">Personal Info</Divider>

          {isPersonalDataEditMode ? (
            <ProfileInfoForm setEditMode={setPersonalDataEditMode} />
          ) : (
            <ProfileInfoDescription setEditMode={setPersonalDataEditMode} />
          )}

          <Divider orientation="left">Shipping addresses</Divider>

          {addresses?.map(
            (address) =>
              shippingAddressIds?.includes(address.id as string) && (
                <Addresses
                  address={address}
                  isBilling={false}
                  isDefault={defaultShippingAddress === address.id}
                  key={address.id}
                />
              ),
          )}

          {billingAddressIds && (
            <>
              <Divider orientation="left">Billing addresses</Divider>

              {addresses?.map(
                (address) =>
                  billingAddressIds?.includes(address.id as string) && (
                    <Addresses
                      address={address}
                      isBilling
                      isDefault={defaultBillingAddress === address.id}
                      key={address.id}
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
