import React, { useState } from 'react';
import { Button, Divider, Row } from 'antd';
import ProfileInfo from './profileInfo/ProfileInfo';
import { useAppSelector } from '../../hooks/hooks';
import Address from './addresses/Address';
import NewAddressModal from './addresses/newAddressModal/NewAddressModal';
import EditProfileModal from './profileInfo/editProfileModal/EditProfileModal';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

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
    <Row justify="center" style={{ height: '80vh' }}>
      {isPasswordModalOpen && (
        <NewAddressModal
          isModalOpen={isPasswordModalOpen}
          setModalOpen={setPasswordModalOpen}
        />
      )}
      <div className={styles.profilePage}>
        {isProfileModalOpen ? (
          <EditProfileModal
            isModalOpen={isProfileModalOpen}
            setModalOpen={setProfileModalOpen}
          />
        ) : (
          <ProfileInfo setEditMode={setProfileModalOpen} />
        )}

        <Divider orientation="left">Shipping addresses</Divider>

        {addresses?.map(
          (address) =>
            shippingAddressIds?.includes(address.id as string) && (
              <Address
                address={address}
                isBilling={false}
                isDefault={defaultShippingAddress === address.id}
                key={address.id}
              />
            ),
        )}

        {billingAddressIds?.length !== 0 && (
          <>
            <Divider orientation="left">Billing addresses</Divider>

            {addresses?.map(
              (address) =>
                billingAddressIds?.includes(address.id as string) && (
                  <Address
                    address={address}
                    isBilling
                    isDefault={defaultBillingAddress === address.id}
                    key={address.id}
                  />
                ),
            )}
          </>
        )}

        <Button
          type="primary"
          onClick={() => setPasswordModalOpen(true)}
          style={{ marginTop: '1em' }}
        >
          Add new address
        </Button>
      </div>
    </Row>
  );
}

export default ProfilePage;
