import React from 'react';
import { Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { addSortCatalog } from '../../../../redux/slices/catalogSlice';
import { useAppDispatch } from '../../../../hooks/hooks';
import styles from '../Сatalog.module.css';

interface IFilterSettings {
  sort: string | null;
  currentCategory: string;
  filter: string;
  attributes: string[];
  price: [number, number];
  search: string;
  totalCards: number;
  currentPage: number;
  cardsOnPage: number;
}

interface IProps {
  settings: IFilterSettings;
  isSettingsCollapsed: boolean;
  setFilterSettingsOpen: (isFilterSettingsOpen: boolean) => void;
}

function FilterSelect({
  settings,
  isSettingsCollapsed,
  setFilterSettingsOpen,
}: IProps) {
  const dispatch = useAppDispatch();

  const showDrawer = () => {
    setFilterSettingsOpen(true);
  };

  return (
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
      {isSettingsCollapsed && (
        <MenuOutlined
          style={{
            color: '#bdbdbd',
            fontSize: '26px',
          }}
          onClick={showDrawer}
        />
      )}
    </div>
  );
}

export default FilterSelect;
