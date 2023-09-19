import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, notification, Row } from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import getPromoCodeThunk from '../../../redux/actions/getPromoCodeThunk';

function PromoCodes() {
  const { promoCodes } = useAppSelector((state) => state.promoCodes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: `${promoCodes[0].title}`,
      description: (
        <Row>
          <Text>{promoCodes[0].description}</Text>
          <Title
            level={5}
            style={{
              border: 'dashed 1px #bdbdbd',
              padding: '.5em',
            }}
          >
            {promoCodes[0].code}
          </Title>
        </Row>
      ),
      icon: <PercentageOutlined style={{ color: '#d3cec5' }} />,
    });
  };

  useEffect(() => {
    dispatch(getPromoCodeThunk());
  }, []);

  return (
    <Row justify="center">
      <Col>
        <Button type="link" onClick={() => navigate('/catalog')}>
          Explore the collection
        </Button>
      </Col>
      <Col>
        {contextHolder}
        <Button type="link" onClick={openNotification}>
          Get season promo code
        </Button>
      </Col>
    </Row>
  );
}

export default PromoCodes;
