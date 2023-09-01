import React from 'react';
import { Button, Col, Form, message, Row } from 'antd';
import { tailFormItemLayout } from '../../../components/form/fieldsProps';
import { updateAddresses } from '../../../services/customerRequests';
import { setProfileData } from '../../../redux/slices/authorizationSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AddressesFormFields from '../../../components/form/userDataForm/AddressesFormFields';

interface ICallBack {
  setEditMode: (isEditMode: boolean) => void;
}

interface IAddressValues {
  city: string;
  cityBilling: string;
  country: string;
  countryBilling: 'RU' | 'USA';
  defaultBillingAddress: string;
  postalCode: string;
  postalCodeBilling: string;
  street: string;
  streetBilling: string;
}

function ProfileInfoForm({ setEditMode }: ICallBack) {
  const userData = useAppSelector((state) => state.authorization.userData);
  const dispatch = useAppDispatch();
  // const [isAddressSingle, setAddressSingle] = useState(true);

  const onFinish = async (values: IAddressValues) => {
    if (userData) {
      const formattedValues = [
        {
          country: values.country,
          postalCode: values.postalCode,
          city: values.city,
          streetName: values.street,
          id: userData?.addresses[0].id,
        },
        {
          country: values.countryBilling,
          postalCode: values.postalCodeBilling,
          city: values.cityBilling,
          streetName: values.streetBilling,
          id: userData?.addresses[1].id,
        },
      ];
      updateAddresses(formattedValues, userData.version)
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

  // todo: проверка на 75 строке
  return (
    <Form
      name="addressesUpdate"
      style={{ maxWidth: 400, marginTop: '1em' }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <AddressesFormFields isBilling={false} />
      <AddressesFormFields isBilling />
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

export default ProfileInfoForm;
