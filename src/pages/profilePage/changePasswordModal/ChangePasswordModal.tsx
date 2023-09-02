import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import updatePasswordThunk from '../../../redux/actions/updatePasswordThunk';
import PasswordFields from '../../../components/form/userDataForm/PasswordFields';
import { fieldsProps } from '../../../components/form/fieldsProps';

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
  const version = useAppSelector(
    (state) => state.authorization.userData?.version,
  );
  const dispatch = useAppDispatch();

  const onFinish = (values: IPasswordFormValues) => {
    if (version) {
      dispatch(
        updatePasswordThunk(values.currentPassword, values.password, version),
      );
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
          form="changePassword"
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Change password
        </Button>,
      ]}
    >
      <Form onFinish={onFinish} id="changePassword">
        <Form.Item {...fieldsProps.currentPassword.props}>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <PasswordFields />
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
