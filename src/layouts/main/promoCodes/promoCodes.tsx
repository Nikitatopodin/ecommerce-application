import React, { useEffect } from 'react';
import { List } from 'antd';
import { getDiscountCodes } from '../../../services/customerRequests';
import {
  IPromoCode,
  addPromoCodes,
} from '../../../redux/slices/promoCodesSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

function PromoCodes() {
  const { promoCodes } = useAppSelector((state) => state.promoCodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getDiscountCodes()
      .then((data) => {
        const promoCodesArr: IPromoCode[] = [];
        data.body.results.forEach((item) => {
          promoCodesArr.push({
            title: item.name!['en-US'],
            description: item.description!['en-US'],
            id: item.id,
            code: item.code,
          });
        });
        dispatch(addPromoCodes(promoCodesArr));
      })
      .catch(console.log);
  }, []);

  return (
    <List
      itemLayout="horizontal"
      header="Promo codes"
      dataSource={promoCodes}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<h3>{item.code}</h3>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}

export default PromoCodes;
