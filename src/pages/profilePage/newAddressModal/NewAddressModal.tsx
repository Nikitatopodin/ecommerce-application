import React, { useState } from 'react';
import { Button, Form, Modal, Radio } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import AddressesFormFields from '../../../components/form/userDataForm/AddressesFormFields';
import formatAddress, { IAddressValues } from '../../../utils/formUtils/formatAddress';
import newAddressThunk from '../../../redux/actions/newAddressThunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

interface IProps {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

function NewAddressModal({ isModalOpen, setModalOpen }: IProps) {
  const [isBilling, setBilling] = useState(false);
  const version = useAppSelector(
    (state) => state.authorization.userData?.version,
  );
  const dispatch = useAppDispatch();
  const onFinish = (values: IAddressValues) => {
    if (version) {
      const address = formatAddress(isBilling, values);
      const isDefault = values.defaultAddress;
      dispatch(newAddressThunk(address, version, isBilling, isDefault));
      setModalOpen(false);
    }
  };
  return (
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
  );
}

export default NewAddressModal;
