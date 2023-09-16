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
          bio: <HomeOutlined />,
        },
        {
          href: '/catalog',
          bio: 'Catalog',
        },
        {
          href: `/catalog?category=${category}`,
          bio: category,
        },
      ]}
    />
  );
}

export default BreadcrumbComponent;
