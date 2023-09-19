import React from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { isOpenCartModalReducer } from '../../../redux/slices/cartModalSlice';

function ModalWindow(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen, callback } = useAppSelector((state) => state.cartModal);

  const handleOk = (): void => {
    dispatch(callback);
    dispatch(isOpenCartModalReducer(false));
  };

  const handleCancel = () => {
    dispatch(isOpenCartModalReducer(false));
  };

  return (
    <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Are you sure you want to clear your cart?</p>
    </Modal>
  );
}

export default ModalWindow;
