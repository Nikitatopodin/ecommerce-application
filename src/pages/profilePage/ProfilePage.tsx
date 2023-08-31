import React, { useState } from 'react';
import { Col, Row } from 'antd';
import ProfileInfoForm from './profileInfo/ProfileInfoForm';
import ProfileInfoDescription from './profileInfo/ProfileInfoDescription';
import AddressesForm from './addresses/AddressesForm';
import AddressesDescription from './addresses/AddressesDescription';

function ProfilePage() {
  const [isPersonalDataEditMode, setPersonalDataEditMode] = useState(false);
  const [isAddressesEditMode, setAddressesEditMode] = useState(false);

  return (
    <Row justify="center" style={{ marginTop: '1em' }}>
      <Col span={12}>
        {isPersonalDataEditMode ? (
          <ProfileInfoForm setEditMode={setPersonalDataEditMode} />
        ) : (
          <ProfileInfoDescription setEditMode={setPersonalDataEditMode} />
        )}
        {isAddressesEditMode ? (
          <AddressesForm setEditMode={setAddressesEditMode} />
        ) : (
          <AddressesDescription setEditMode={setAddressesEditMode} />
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
