import React from 'react';
import { BaseAddress } from '@commercetools/platform-sdk';
import { Button, Col, Form, message, Row } from 'antd';
import { tailFormItemLayout } from '../../../components/form/fieldsProps';
import { updateAddress } from '../../../services/customerRequests';
import { setProfileData } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AddressesFormFields from '../../../components/form/userDataForm/AddressesFormFields';
import formatAddress, { IAddressValues } from '../../../utils/formatAddress';

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
      updateAddress(formattedAddress, userData.version)
        .then((response) => {
          dispatch(
            setProfileData({
              ...response.body,
              version: response.body.version,
            }),
          );
          message.success('Your addresses is up to date');
        })
        .catch(() => {
          message.error('Something went wrong, please try again');
        });
      setEditMode(false);
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
