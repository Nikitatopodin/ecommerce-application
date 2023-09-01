import React from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import { Button, Col, Form, Row } from 'antd';
import { tailFormItemLayout } from '../../../components/form/fieldsProps';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AddressesFormFields from '../../../components/form/userDataForm/AddressesFormFields';
import formatAddress, { IAddressValues } from '../../../utils/formatAddress';
import updateAddressThunk from '../../../redux/actions/updateAddressThunk';

interface IProps {
  isBilling: boolean;
  setEditMode: (isEditMode: boolean) => void;
  address: BaseAddress;
}

function AddressForm({ isBilling, setEditMode, address }: IProps) {
  const userData = useAppSelector((state) => state.authorization.userData);
  const dispatch = useAppDispatch();

  const onFinish = async (values: IAddressValues) => {
    const formattedAddress = formatAddress(isBilling, values, address.id);

    if (userData) {
      dispatch(
        updateAddressThunk(
          formattedAddress,
          userData.version,
          values.defaultAddress,
          isBilling,
          setEditMode,
        ),
      );
    }
  };

  return (
    <Form
      name="addressesUpdate"
      style={{ maxWidth: 400, marginTop: '1em' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <AddressesFormFields isBilling={isBilling} address={address} />

      <Form.Item {...tailFormItemLayout}>
        <Row>
          <Col>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Col>
          <Col offset={2}>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}

export default AddressForm;
