import React from 'react';
import Title from 'antd/es/typography/Title';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import updatePasswordThunk from '../../../../redux/actions/updatePasswordThunk';
import PasswordFields from '../../../../components/form/userDataForm/PasswordFields';
import { fieldsProps } from '../../../../components/form/userDataForm/formProps/fieldsProps';

interface IProps {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
}

interface IPasswordFormValues {
  currentPassword: string;
  password: string;
  confirm: string;
}

function ChangePasswordModal({ isModalOpen, setModalOpen }: IProps) {
  const userEmail = useAppSelector(
    (state) => state.authorization.userData?.email,
  );
  const version = useAppSelector(
    (state) => state.authorization.userData?.version,
  );
  const dispatch = useAppDispatch();

  const onFinish = (values: IPasswordFormValues) => {
    if (version && userEmail) {
      dispatch(
        updatePasswordThunk(
          userEmail,
          values.currentPassword,
          values.password,
          version,
        ),
      );
      setModalOpen(false);
    }
  };
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          form="changePassword"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Change password
        </Button>,
        <Button
          form="changePassword"
          key="cancel"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </Button>,
      ]}
    >
      <Title style={{ textAlign: 'center', marginBottom: '1.5em' }} level={3}>
        Change password
      </Title>
      <Form name="changePassword" id="changePassword" onFinish={onFinish}>
        <Form.Item {...fieldsProps.currentPassword.props}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <PasswordFields />
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
