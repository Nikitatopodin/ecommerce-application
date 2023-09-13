import React from 'react';
import { Pagination, PaginationProps } from 'antd';
import { useAppSelector } from '../../../hooks/hooks';

function PaginationCatalog() {
  const { totalCards, cardsOnPage, currentPage } = useAppSelector(
    (state) => state.catalog.settings,
  );

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    console.log(current, pageSize);
  };

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };

  return (
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={currentPage}
      total={totalCards}
      pageSizeOptions={[2, 5, 10, 20]}
      pageSize={cardsOnPage}
      onChange={onChange}
    />
  );
}

export default PaginationCatalog;
