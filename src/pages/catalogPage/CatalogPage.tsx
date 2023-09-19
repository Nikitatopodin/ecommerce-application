import React from 'react';
import { Space } from 'antd';
import Catalog from './catalog/Catalog';

function CatalogPage(): JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Catalog />
    </Space>
  );
}

export default CatalogPage;
