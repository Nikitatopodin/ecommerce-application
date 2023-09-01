import React, { useState } from 'react';
import { Button, Checkbox, Input, Row, Slider, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addSearchString,
  changePrice,
  resetFilter,
  setAttributes,
} from '../../redux/slices/catalogSlice';

const { Search } = Input;

const colorsAndAttributes = ['White', 'Pink', 'With picture'];

function CatalogMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const { price, attributes, search } = useAppSelector(
    (state) => state.catalog.settings,
  );

  const [searchValue, setSearchValue] = useState(search);

  const onChangeAttributes = (checkedValues: CheckboxValueType[]) => {
    dispatch(setAttributes(checkedValues));
  };

  const onChangePrice = (value: [number, number]) => {
    dispatch(changePrice(value));
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
        // marks={}
        range={{ draggableTrack: true }}
        value={price}
        min={0}
        max={6}
        step={0.1}
        onChange={onChangePrice}
      />
      <h3 style={{ margin: 0 }}>Colors and attributes</h3>
      <Checkbox.Group
        options={colorsAndAttributes}
        value={attributes}
        onChange={onChangeAttributes}
      />
      <Row gutter={16} style={{ margin: '0 auto', display: 'flex', gap: 10 }}>
        <Button type="primary" htmlType="submit">
          Use filter
        </Button>
        <Button
          onClick={() => {
            dispatch(resetFilter());
            setSearchValue('');
          }}
        >
          Reset
        </Button>
      </Row>
    </Space>
  );
}

export default CatalogMenu;
