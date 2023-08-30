import { Button, Col, Row, Image, Carousel } from 'antd';
import React, { useEffect } from 'react';
import { getProductById } from '../services/customerRequests';
import { productInfoReducer } from '../redux/slices/productInfoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function Product() {
  const productID = '70e1f084-be81-4c7d-8174-e3112f4aa0f8';
  const dispatch = useAppDispatch();
  const productInfo = useAppSelector((state) => state.productInfo);

  const onClick = () => {
    getProductById(productID).then((data) => {
      const info = {
        name: data.body.name['en-US'],
        images: data.body.variants[0].images,
        description: data.body.description!['en-US'],
        prices: data.body.masterVariant.prices,
      };
      dispatch(productInfoReducer(info));
    });
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    console.log(productInfo);
  }, [productInfo]);
  return (
    <Row style={{ padding: '2.5em 3em' }}>
      <Col style={{ width: '50%', marginRight: '10px' }}>
        <Carousel
          afterChange={onChange}
          style={{
            backgroundColor: 'black',
            border: '1px solid black',
            width: '50%',
            marginLeft: 'auto',
          }}
        >
          <Image src={productInfo.images[0].url} style={contentStyle} />
          <Image src={productInfo.images[1].url} style={contentStyle} />
        </Carousel>
      </Col>
      <Col style={{ marginLeft: '10px', marginTop: 'auto' }}>
        <Row style={{ fontWeight: 'bold' }}>{productInfo.name}</Row>
        <Row>Description: {productInfo.description}</Row>
        <Row>
          Price: $
          {productInfo.prices[0].value.centAmount / 100 +
            '.'.toString().padEnd(3, '0')}
        </Row>
        <Row>
          <Button onClick={onClick}>Get Product</Button>
        </Row>
      </Col>
    </Row>
  );
}
export default Product;
