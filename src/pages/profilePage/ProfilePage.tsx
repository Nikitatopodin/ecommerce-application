import React, { useState } from 'react';
import { Button, Col, Divider, Form, Modal, Radio, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import ProfileInfoForm from './profileInfo/ProfileInfoForm';
import ProfileInfoDescription from './profileInfo/ProfileInfoDescription';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Addresses from './addresses/Addresses';
import AddressesFormFields from '../../components/form/userDataForm/AddressesFormFields';
import newAddressThunk from '../../redux/actions/newAddressThunk';
import formatAddress, { IAddressValues } from '../../utils/formatAddress';

function ProfilePage() {
  const [isPersonalDataEditMode, setPersonalDataEditMode] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBilling, setBilling] = useState(false);
  const dispatch = useAppDispatch();

  const version = useAppSelector(
    (state) => state.authorization.userData?.version,
  );
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

  const onFinish = (values: IAddressValues) => {
    if (version) {
      const address = formatAddress(isBilling, values);
      const isDefault = values.defaultBillingAddress;
      dispatch(newAddressThunk(address, version, isBilling, isDefault));
      setModalOpen(false);
    }
  };

  return (
    <Row justify="center" style={{ margin: '1em auto' }}>
      <Modal
        title="Add new address"
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            form="addAddressForm"
            key="submit"
            htmlType="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
      >
        <Form onFinish={onFinish} id="addAddressForm">
          <FormItem>
            <Radio.Group
              defaultValue="shipping"
              onChange={() => setBilling((prevState) => !prevState)}
            >
              <Radio value="shipping">Shipping address</Radio>
              <Radio value="billing">Billing address</Radio>
            </Radio.Group>
          </FormItem>
          <AddressesFormFields isBilling={isBilling} />
        </Form>
      </Modal>
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
          <Button
            type="primary"
            onClick={() => setModalOpen(true)}
            style={{ marginTop: '1em' }}
          >
            Add new address
          </Button>
        </>
      </Col>
    </Row>
  );
}

export default ProfilePage;
