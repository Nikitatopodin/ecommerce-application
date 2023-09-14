import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  setCardsOnPage,
  setCurrentPage,
} from '../../../redux/slices/catalogSlice';

function PaginationCatalog() {
  const { totalCards, cardsOnPage, currentPage } = useAppSelector(
    (state) => state.catalog.settings,
  );

  const dispatch = useAppDispatch();

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    dispatch(setCurrentPage(current));
    dispatch(setCardsOnPage(pageSize));
  };

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  function changeCardsOnPage() {
    if (window.innerWidth >= 1600) {
      dispatch(setCardsOnPage(10));
    } else if (window.innerWidth >= 1200) {
      dispatch(setCardsOnPage(8));
    } else if (window.innerWidth >= 992) {
      dispatch(setCardsOnPage(6));
    } else if (window.innerWidth >= 576) {
      dispatch(setCardsOnPage(4));
    } else {
      dispatch(setCardsOnPage(2));
    }
  }

  changeCardsOnPage();

  window.addEventListener('resize', () => changeCardsOnPage());

  return (
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={currentPage}
      total={totalCards}
      pageSizeOptions={[2, 4, 6, 8, 10, 20]}
      pageSize={cardsOnPage}
      onChange={onChange}
    />
  );
}

export default PaginationCatalog;
