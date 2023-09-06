import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface IProps {
  category: string | undefined;
}

function BreadcrumbComponent({ category }: IProps) {
  return (
    <Breadcrumb
      style={{ marginLeft: '1em' }}
      items={[
        {
          href: '/',
          title: <HomeOutlined />,
        },
        {
          href: '/catalog',
          title: 'Catalog',
        },
        {
          href: `/catalog?category=${category}`,
          title: category,
        },
      ]}
    />
  );
}

export default BreadcrumbComponent;
