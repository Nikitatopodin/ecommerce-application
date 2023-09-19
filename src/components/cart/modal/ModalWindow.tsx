import React from 'react';
import { Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { isOpenCartModalReducer } from '../../../redux/slices/cartModalSlice';
import removeCartThunk from '../../../redux/actions/removeCartThunk';

function ModalWindow(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cartModal);
  const { cart } = useAppSelector((state) => state.cart);

  const handleOk = (): void => {
    dispatch(removeCartThunk(cart!.version, cart!.id));
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
