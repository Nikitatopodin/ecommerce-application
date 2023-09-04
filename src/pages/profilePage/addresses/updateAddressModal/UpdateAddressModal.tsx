import React from 'react';
import { Button, Form, Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { BaseAddress } from '@commercetools/platform-sdk';
import AddressesFormFields from '../../../../components/form/userDataForm/AddressesFormFields';
import formatAddress, {
  IAddressValues,
} from '../../../../utils/form/formatAddress';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import updateAddressThunk from '../../../../redux/actions/updateAddressThunk';

interface IProps {
  address: BaseAddress;
  isBilling: boolean;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

function UpdateAddressModal({
  address,
  isBilling,
  isModalOpen,
  setModalOpen,
}: IProps) {
  const userData = useAppSelector((state) => state.authorization.userData);
  const dispatch = useAppDispatch();

  const onFinish = async (values: IAddressValues) => {
    if (userData) {
      const formattedAddress = formatAddress(isBilling, values, address.id);
      dispatch(
        updateAddressThunk(
          formattedAddress,
          userData.version,
          values.defaultBillingAddress,
          isBilling,
          setModalOpen,
        ),
      );
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          form="addressesUpdate"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Update
        </Button>,
        <Button
          form="addressesUpdate"
          onClick={() => setModalOpen(false)}
          key="cancel"
        >
          Cancel
        </Button>,
      ]}
    >
      <Title style={{ textAlign: 'center', marginBottom: '1.5em' }} level={3}>
        Update the address
      </Title>
      <Form name="addressesUpdate" id="addressesUpdate" onFinish={onFinish}>
        <AddressesFormFields isBilling={isBilling} address={address} />
      </Form>
    </Modal>
  );
}

export default UpdateAddressModal;
