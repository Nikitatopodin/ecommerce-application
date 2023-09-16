import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface IBreadcrumbItem {
  href?: string;
  title: string | JSX.Element;
}

interface IProps {
  category: string | undefined;
}

function BreadcrumbComponent({ category }: IProps) {
  const breadcrumbItems: IBreadcrumbItem[] = [
    {
      href: '/',
      title: <HomeOutlined />,
    },
    {
      href: '/catalog',
      title: 'Catalog',
    },
    {
      title: category === undefined ? '' : category,
    },
  ];

  return <Breadcrumb style={{ marginLeft: '1em' }} items={breadcrumbItems} />;
}

export default BreadcrumbComponent;
