import React from 'react';
import { Button, Checkbox, Input, Row, Slider, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const { Search } = Input;

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const colorsAndAttributes = ['White', 'Pink', 'With picture'];

function CatalogMenu(): JSX.Element {
  const onSearch = (value: string) => console.log(value);

  return (
    <Space direction="vertical" style={{ display: 'flex', gap: 50 }}>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <h3 style={{ margin: 0 }}>Price</h3>
      <Slider
        // marks={}
        range={{ draggableTrack: true }}
        defaultValue={[0, 5]}
        min={0}
        max={10}
        step={0.1}
      />
      <h3 style={{ margin: 0 }}>Colors and attributes</h3>
      <Checkbox.Group
        options={colorsAndAttributes}
        // defaultValue={[]}
        onChange={onChange}
      />
      <Row gutter={16} style={{ margin: '0 auto', display: 'flex', gap: 10 }}>
        <Button type="primary" htmlType="submit">
          Use filter
        </Button>
        <Button onClick={() => {}}>Reset</Button>
      </Row>
    </Space>
  );
}

export default CatalogMenu;
