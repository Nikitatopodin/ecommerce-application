import React, { useState } from 'react';
import { Button, Form, Modal, Radio } from 'antd';
import AddressesFormFields from '../../../../components/form/AddressesFormFields';
import formatAddress, {
  IAddressValues,
} from '../../../../utils/form/formatAddress';
import newAddressThunk from '../../../../redux/actions/newAddressThunk';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

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
      const formattedAddress = formatAddress(isBilling, values);
      dispatch(
        newAddressThunk(
          formattedAddress,
          version,
          isBilling,
          values.defaultBillingAddress,
        ),
      );
      setModalOpen(false);
    }
  };
  return (
    <Modal
      data-testid="newAddressModal"
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
        <Form.Item>
          <Radio.Group
            defaultValue="shipping"
            onChange={() => setBilling((prevState) => !prevState)}
          >
            <Radio value="shipping">Shipping address</Radio>
            <Radio value="billing">Billing address</Radio>
          </Radio.Group>
        </Form.Item>
        <AddressesFormFields isBilling={isBilling} />
      </Form>
    </Modal>
  );
}

export default NewAddressModal;
