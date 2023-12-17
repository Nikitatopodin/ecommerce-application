import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Drawer, Layout, Menu } from 'antd';
import { useSearchParams } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CatalogMenu from './catalogMenu/CatalogMenu';
import { getCategories, getProducts } from '../../../services/customerRequests';
import { IProductQueryArgs } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  addCurrentCategory,
  addDataAttributes,
  addDataCatalog,
  setTotalCards,
} from '../../../redux/slices/catalogSlice';
import BreadcrumbComponent from './breadcrumb/BreadcrumbComponent';
import PaginationCatalog from './pagination/PaginationCatalog';
import ProductList from './productList/ProductList';
import FilterSelect from './filterSelect/FilterSelect';

const { Sider } = Layout;

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
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();
  const { dataProducts, settings } = useAppSelector((state) => state.catalog);

  const [categoriesData, setCategoriesData] = useState<ICategory[]>([]);
  const [isSettingsCollapsed, setSettingsCollapsed] = useState(
    window.innerWidth < 720,
  );
  const [isFilterSettingsOpen, setFilterSettingsOpen] = useState(false);

  const onFilterSettingsClose = () => {
    setFilterSettingsOpen(false);
  };
  const onMenuClick: MenuProps['onClick'] = (e) => {
    dispatch(addCurrentCategory(e.key));
  };

  window.addEventListener('resize', () =>
    setSettingsCollapsed(window.innerWidth < 720),
  );

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
        item.masterVariant?.attributes?.forEach((attr) => {
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

  return (
    <Layout style={{ padding: '1em' }} data-testid="catalog">
      {!isSettingsCollapsed ? (
        <Sider style={{ background: 'transparent', padding: 14 }}>
          <CatalogMenu />
        </Sider>
      ) : (
        <Drawer
          title="Filter settings"
          placement="left"
          onClose={onFilterSettingsClose}
          open={isFilterSettingsOpen}
          key="left"
          width={300}
        >
          <CatalogMenu />
        </Drawer>
      )}

      <Layout style={{ display: 'flex', gap: 10 }}>
        <Menu
          onClick={onMenuClick}
          selectedKeys={[settings.currentCategory]}
          mode="horizontal"
          items={[...categoriesData!]}
          style={menuStyle}
        />
        <FilterSelect
          settings={settings}
          isSettingsCollapsed={isSettingsCollapsed}
          setFilterSettingsOpen={setFilterSettingsOpen}
        />
        <BreadcrumbComponent category={getCategoryLabel()} />
        <ProductList dataProducts={dataProducts} />
        <PaginationCatalog />
      </Layout>
    </Layout>
  );
}

export default Catalog;
