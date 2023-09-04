import './ProductPage.css';
import { Button, Col, Row, Image, Carousel, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useLoaderData } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: '160px',
  width: '25vw',
  textAlign: 'center',
  background: '#364d79',
};

function Product() {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const productData: ProductProjection = useLoaderData() as ProductProjection;
  const [currentSize, setCurrentSize] = useState(0);

  const productInfo = {
    name: productData.name['en-US'],
    images: productData.masterVariant.images,
    description: productData.description!['en-US'],
    prices: [
      [
        productData.masterVariant.prices![0].value,
        productData.masterVariant.prices![0].discounted?.value,
      ],
      [
        productData.variants[0].prices![0].value,
        productData.variants[0].prices![0].discounted?.value,
      ],
    ],
  };

  const onSizeButtonClick = (e: EventTarget) => {
    if (e instanceof Node) {
      if (e.textContent! === '7*10') {
        setCurrentSize(1);
      } else {
        setCurrentSize(0);
      }
    }
  };

  const onChange = () => {};

  useEffect(() => {}, [currentSize]);
  return (
    <Row
      style={{
        padding: '2.5em 3em',
        margin: '2.5em 3em',
        justifyContent: 'center',
        border: '1px solid black',
      }}
    >
      <Col className="product-left">
        <Row className="product-title" style={{ flexGrow: '1' }}>
          {productInfo.name}
        </Row>
        <Image
          src={productInfo.images![0].url}
          onClick={showModal}
          preview={false}
          className="product-img"
        />
        <Modal
          open={open}
          title={productInfo.name}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          destroyOnClose
        >
          <Carousel
            afterChange={onChange}
            style={{
              backgroundColor: 'black',
              border: '1px solid black',
              width: '100%',
              marginLeft: 'auto',
            }}
            dots={{ className: 'dots' }}
          >
            <Image
              src={productInfo.images![0].url}
              style={contentStyle}
              preview={false}
            />
            <Image
              src={productInfo.images![1].url}
              style={contentStyle}
              preview={false}
            />
          </Carousel>
        </Modal>
      </Col>
      <Col
        style={{ marginLeft: '10px', marginTop: '2rem' }}
        className="product-info"
      >
        <Row style={{ fontWeight: 'bold', margin: '10px 0' }}>
          Size:&nbsp;
          <Row style={{ gap: '5px', justifyContent: 'space-between' }}>
            <Button
              type={currentSize === 0 ? 'primary' : 'default'}
              style={{ width: '5rem', fontSize: '1.05rem', lineHeight: '1rem' }}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              {productData.masterVariant.attributes![1].value.label}
            </Button>
            <Button
              type={currentSize === 1 ? 'primary' : 'default'}
              style={{ width: '5rem', fontSize: '1.05rem', lineHeight: '1rem' }}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              {productData.variants[0].attributes![1].value.label}
            </Button>
          </Row>
        </Row>
        <Row style={{ margin: '10px 0' }}>
          <span style={{ fontWeight: 'bold' }}>Description:&nbsp;</span>
          {productInfo.description}
        </Row>
        <Row style={{ margin: '10px 0' }}>
          <span style={{ fontWeight: 'bold' }}>Price:&nbsp;</span>
          <div style={{ display: 'flex', gap: '10px' }}>
            {productInfo.prices[currentSize][1] && (
              <div className="price">
                {(
                  productInfo.prices[currentSize][1]!.centAmount / 100
                ).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            )}
            <div
              className={
                productInfo.prices[currentSize][1]! ? 'price-old' : 'price'
              }
            >
              {(
                productInfo.prices[currentSize][0]!.centAmount / 100
              ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </div>
          </div>
        </Row>
      </Col>
    </Row>
  );
}
export default Product;
