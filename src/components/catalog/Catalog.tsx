import React, { useState } from 'react';
import { Card, Layout, List, Menu, Select } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import { Header } from 'antd/es/layout/layout';
import Meta from 'antd/es/card/Meta';
import type { MenuProps } from 'antd';
import CatalogMenu from './CatalogMenu';

type MenuItem = Required<MenuProps>['items'][number];

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  style?: React.CSSProperties,
  icon?: React.ReactNode,
  className?: string,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
    style,
    className,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('All categories', ''),
  getItem('Happy birthday', 'happyBirthday'),
  getItem('Love', 'love'),
  getItem('Wedding', 'wedding'),
];

const data = [
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
  {
    title: 'Happy birthbay',
    image: './hb.JPG',
    description: 'sdlfkhslndf sjdfhlkjdf',
  },
];

function Catalog(): JSX.Element {
  const [current, setCurrent] = useState('');
  const [selectedSort, setSelectedSort] = useState<string>();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent',
        }}
      >
        <Title level={2}>Catalog</Title>
      </Header>
      <Layout>
        <Sider style={{ background: 'transparent', padding: 14 }}>
          <CatalogMenu />
        </Sider>
        <Layout style={{ display: 'flex', gap: 10 }}>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={[...items!]}
            style={menuStyle}
          />
          <Select
            placeholder="Select a sorting option"
            value={selectedSort}
            onChange={setSelectedSort}
            style={{ width: 240 }}
            options={[
              {
                value: 'asc price',
                label: 'Sort by ascending prices',
              },
              {
                value: 'desc price',
                label: 'Sort by descending prices',
              },
              {
                value: 'asc name',
                label: 'Sort by ascending names',
              },
              {
                value: 'desc name',
                label: 'Sort by descending names',
              },
            ]}
          />
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="./hb.JPG" />}
                >
                  <Meta title={item.title} description={item.description} />
                  <div>
                    <div className="price">2$</div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Catalog;
