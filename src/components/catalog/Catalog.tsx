import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Badge, Button, Card, Drawer, Layout, List, Menu, Select } from 'antd';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LineItem } from '@commercetools/platform-sdk';
import Sider from 'antd/es/layout/Sider';
import Meta from 'antd/es/card/Meta';
import { MenuOutlined } from '@ant-design/icons';
import CatalogMenu from './CatalogMenu';
import { getCategories, getProducts } from '../../services/customerRequests';
import { IProductQueryArgs } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addCurrentCategory,
  addDataAttributes,
  addDataCatalog,
  addSortCatalog,
  setTotalCards,
} from '../../redux/slices/catalogSlice';
import styles from './Сatalog.module.css';
import BreadcrumbComponent from './breadcrumb/BreadcrumbComponent';
import PaginationCatalog from './pagination/PaginationCatalog';
import updateCartThunk from '../../redux/actions/updateCartThunk';
import removeCartItemThunk from '../../redux/actions/removeCartItemThunk';

interface ICategory {
  label: string;
  key: string;
}

const menuStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  display: 'flex',
  margin: '0 1em',
};

const searchKey = 'text.en-us';

function Catalog(): JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const [isCollapsedSettings, setCollapsedSettings] = useState(
    window.innerWidth < 720,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dataProducts, settings } = useAppSelector((state) => state.catalog);
  const cart = useAppSelector((state) => state.cart.cart);

  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(addCurrentCategory(e.key));
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        const categoriesArr: ICategory[] = [];
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

  function getCategoryLabel(): string | undefined {
    return categoriesData
      .find((elem) => elem.key === settings.currentCategory)
      ?.label.toLowerCase();
  }

  useEffect(() => {
    const queryParams: IProductQueryArgs = {
      limit: settings.cardsOnPage,
      offset:
        settings.currentPage * settings.cardsOnPage - settings.cardsOnPage,
      priceCurrency: 'USD',
      filter: [
        `variants.scopedPrice.value.centAmount:range (${
          settings.price[0] * 100
        } to ${settings.price[1] * 100})`,
      ],
    };
    if (settings.currentCategory) {
      queryParams.filter.push(`categories.id:"${settings.currentCategory}"`);
      setSearchParams(() => `category=${getCategoryLabel()}`);
    }
    if (settings.sort) {
      queryParams.sort = settings.sort;
    }
    if (settings.search) {
      queryParams[searchKey] = settings.search;
    }
    settings.attributes.forEach((attr) => {
      if (attr === 'With picture') {
        queryParams.filter.push('variants.attributes.picture:true');
      } else {
        const key = attr.toLowerCase();
        queryParams.filter.push(`variants.attributes.color.key:"${key}"`);
      }
    });
    getProducts(queryParams)
      .then((data) => {
        dispatch(addDataCatalog(data.body.results));
        dispatch(setTotalCards(data.body.total));
      })
      .catch(console.log);
  }, [settings]);

  useEffect(() => {
    if (dataProducts.length) {
      const findAttributes = new Set<string>();
      dataProducts.forEach((item) => {
        item.variants[0].attributes?.forEach((attr) => {
          if (attr.name === 'picture' && attr.value) {
            findAttributes.add('With picture');
          } else if (attr.name === 'color') {
            findAttributes.add(
              attr.value.key.charAt(0).toUpperCase() + attr.value.key.slice(1),
            );
          }
        });
      });
      dispatch(addDataAttributes(Array.from(findAttributes)));
    }
  }, [dataProducts]);

  window.addEventListener('resize', () =>
    setCollapsedSettings(window.innerWidth < 720),
  );

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getProductId = (element: LineItem, id: string) =>
    element.productId === id;

  const addItemToCart = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(updateCartThunk(cart!.version, id, 1, 1, cart!.id));
  };

  const removeItemfromCart = (
    event: React.MouseEvent,
    id: string,
    price: number,
  ) => {
    event.stopPropagation();
    dispatch(
      removeCartItemThunk(
        cart!.version,
        cart!.id,
        cart!.lineItems.find((elemnt) => getProductId(elemnt, String(id)))!.id,
        'USD',
        price,
      ),
    );
  };

  return (
    <Layout>
      {!isCollapsedSettings ? (
        <Sider style={{ background: 'transparent', padding: 14 }}>
          <CatalogMenu />
        </Sider>
      ) : (
        <Drawer
          title="Filter settings"
          placement="left"
          onClose={onClose}
          open={open}
          key="left"
          width={300}
        >
          <CatalogMenu />
        </Drawer>
      )}
      <Layout style={{ display: 'flex', gap: 10 }}>
        <Menu
          onClick={onClick}
          selectedKeys={[settings.currentCategory]}
          mode="horizontal"
          items={[...categoriesData!]}
          style={menuStyle}
        />
        <div className={styles.settingsWrapper}>
          <Select
            placeholder="Select a sorting option"
            value={settings.sort}
            onChange={(value) => dispatch(addSortCatalog(value))}
            style={{ width: 240, marginLeft: '.9em' }}
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
          {isCollapsedSettings && (
            <MenuOutlined
              style={{
                color: '#bdbdbd',
                fontSize: '26px',
              }}
              onClick={showDrawer}
            />
          )}
        </div>
        <BreadcrumbComponent category={getCategoryLabel()} />
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
              <Card
                hoverable
                className={styles.card}
                onClick={() => navigate(item.id!)}
                cover={
                  item.masterVariant.scopedPriceDiscounted ? (
                    <Badge.Ribbon
                      text={item.masterVariant.scopedPriceDiscounted && 'Sale'}
                      color={item.masterVariant.scopedPriceDiscounted && 'red'}
                    >
                      <img
                        alt="example"
                        src={item.masterVariant!.images![0].url}
                        className={styles.picture}
                      />
                    </Badge.Ribbon>
                  ) : (
                    <img
                      alt="example"
                      src={item.masterVariant!.images![0].url}
                      className={styles.picture}
                    />
                  )
                }
              >
                <Meta
                  title={item.name['en-US']}
                  description={item.description!['en-US']}
                />
                <div className={styles.priceWrapper}>
                  {item.masterVariant.scopedPriceDiscounted && (
                    <div className={styles.price}>
                      {(
                        item.masterVariant.price!.discounted!.value.centAmount /
                        100
                      ).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </div>
                  )}
                  <div
                    className={
                      item.masterVariant.scopedPriceDiscounted
                        ? styles.priceOld
                        : styles.price
                    }
                  >
                    {(
                      item.masterVariant.price!.value.centAmount / 100
                    ).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </div>
                </div>
                <Button
                  onClick={(event) =>
                    cart?.lineItems.some((elemnt) =>
                      getProductId(elemnt, String(item.id)),
                    )
                      ? removeItemfromCart(
                          event,
                          String(item.id),
                          item.masterVariant.price!.value.centAmount,
                        )
                      : addItemToCart(event, String(item.id))
                  }
                >
                  {cart?.lineItems.some((elemnt) =>
                    getProductId(elemnt, String(item.id)),
                  )
                    ? 'Remove from Cart'
                    : 'Add to Cart'}
                </Button>
              </Card>
            </List.Item>
          )}
        />
        <PaginationCatalog />
      </Layout>
    </Layout>
  );
}

export default Catalog;
