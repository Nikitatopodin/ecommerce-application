import React, { useState } from 'react';
import { Button, Checkbox, Input, Slider, Space } from 'antd';
import type { SliderMarks } from 'antd/es/slider';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addSearchString,
  changePrice,
  resetFilter,
  setAttributes,
} from '../../redux/slices/catalogSlice';

const { Search } = Input;

function CatalogMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const { dataAttributes, settings } = useAppSelector((state) => state.catalog);

  const [searchValue, setSearchValue] = useState(settings.search);

  const onChangeAttributes = (checkedValues: CheckboxValueType[]) => {
    dispatch(setAttributes(checkedValues));
  };

  const onChangePrice = (value: [number, number]) => {
    dispatch(changePrice(value));
  };

  const marks: SliderMarks = {
    [settings.price[0]]: settings.price[0].toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
    [settings.price[1]]: settings.price[1].toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  };

  const onSearch = (value: string) => dispatch(addSearchString(value));

  return (
    <Space direction="vertical" style={{ display: 'flex', gap: 50 }}>
      <Search
        placeholder="search text"
        onSearch={onSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        enterButton
      />
      <h3 style={{ margin: 0 }}>Price</h3>
      <Slider
        marks={marks}
        range={{ draggableTrack: true }}
        value={settings.price}
        min={0}
        max={6}
        step={0.1}
        onChange={onChangePrice}
      />
      <h3 style={{ margin: 0 }}>Colors and attributes</h3>
      <Checkbox.Group
        options={dataAttributes}
        value={settings.attributes}
        onChange={onChangeAttributes}
      />
      <Button
        style={{ margin: '10px auto', display: 'block' }}
        onClick={() => {
          dispatch(resetFilter());
          setSearchValue('');
        }}
      >
        Reset filters
      </Button>
    </Space>
  );
}

export default CatalogMenu;
