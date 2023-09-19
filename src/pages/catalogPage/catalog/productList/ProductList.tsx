import React from 'react';
import { List } from 'antd';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductCard from './productCard/ProductCard';

interface IProps {
  dataProducts: ProductProjection[];
}

function ProductList({ dataProducts }: IProps) {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      dataSource={dataProducts}
      renderItem={(item) => (
        <List.Item>
          <ProductCard item={item} />
        </List.Item>
      )}
    />
  );
}

export default ProductList;
