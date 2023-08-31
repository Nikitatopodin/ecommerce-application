import React, { useEffect, useState } from 'react';
import { Card, Layout, List, Menu, Select } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Title from 'antd/es/typography/Title';
import { Header } from 'antd/es/layout/layout';
import Meta from 'antd/es/card/Meta';
import type { MenuProps } from 'antd';
import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import CatalogMenu from './CatalogMenu';
import { getCategories, getProducts } from '../../services/customerRequests';
import { IProductQueryArgs } from '../../types/types';

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
};

function Catalog(): JSX.Element {
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const [selectedSort, setSelectedSort] = useState<string>();
  const [dataProducts, setDataProducts] =
    useState<ClientResponse<ProductProjectionPagedQueryResponse>>();
  const [categoriesData, setCategoriesData] = useState<MenuProps['items']>([]);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentCategoryId(e.key);
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        const categoriesArr: MenuProps['items'] = [];
        data.body.results.forEach((item) => {
          categoriesArr.push({
            label: item.name['en-US'],
            key: item.id,
          });
        });
        setCategoriesData(categoriesArr);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const queryParams: IProductQueryArgs = {};
    if (currentCategoryId) {
      queryParams.filter = `categories.id:"${currentCategoryId}"`;
    }
    if (selectedSort) {
      queryParams.sort = [selectedSort];
    }
    getProducts(queryParams)
      .then((data) => {
        setDataProducts(data);
      })
      .catch(console.log);
  }, [currentCategoryId, selectedSort]);

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
            selectedKeys={[currentCategoryId]}
            mode="horizontal"
            items={[...categoriesData!]}
            style={menuStyle}
          />
          <Select
            placeholder="Select a sorting option"
            value={selectedSort}
            onChange={setSelectedSort}
            style={{ width: 240 }}
            options={[
              {
                value: 'price asc',
                label: 'Sort by ascending prices',
              },
              {
                value: 'price desc',
                label: 'Sort by descending prices',
              },
              {
                value: 'name.en-us asc',
                label: 'Sort by ascending names',
              },
              {
                value: 'name.en-us desc',
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
            dataSource={dataProducts?.body.results}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={item.masterVariant!.images![0].url}
                    />
                  }
                >
                  <Meta
                    title={item.name['en-US']}
                    description={item.description!['en-US']}
                  />
                  <div>
                    <div className="price">
                      {(
                        item.masterVariant.prices![0].value.centAmount / 100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </div>
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
