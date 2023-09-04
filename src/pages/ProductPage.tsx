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
      productData.masterVariant.prices![0],
      productData.variants[0].prices![0],
    ],
  };

  const onSizeButtonClick = (e: EventTarget) => {
    if (e instanceof Node) {
      if (e.textContent! === 'Small') {
        setCurrentSize(1);
      } else {
        setCurrentSize(0);
      }
    }
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {}, [currentSize]);
  return (
    <Row style={{ padding: '2.5em 3em', justifyContent: 'center' }}>
      <Col style={{ width: '25%', marginRight: '10px' }}>
        <Row style={{ fontWeight: 'bold', margin: '10px 0' }}>
          {productInfo.name}
        </Row>
        <Image
          src={productInfo.images![0].url}
          onClick={showModal}
          preview={false}
        />
        <Modal
          open={open}
          title={productInfo.name}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        >
          <Carousel
            afterChange={onChange}
            style={{
              backgroundColor: 'black',
              border: '1px solid black',
              width: '100%',
              marginLeft: 'auto',
            }}
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
      <Col style={{ marginLeft: '10px' }}>
        <Row style={{ fontWeight: 'bold', margin: '10px 0' }}>
          Size:
          <Col>
            <Button
              style={{ width: '5rem' }}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              Medium
            </Button>
            <Button
              style={{ width: '5rem' }}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              Small
            </Button>
          </Col>
        </Row>
        <Row style={{ margin: '10px 0' }}>
          <span style={{ fontWeight: 'bold' }}>Description:</span>
          {productInfo.description}
        </Row>
        <Row style={{ margin: '10px 0' }}>
          <span style={{ fontWeight: 'bold' }}>Price:</span> $
          {`${Math.trunc(
            productInfo.prices[currentSize].value.centAmount / 100,
          )}.${(productInfo.prices[currentSize].value.centAmount % 100)
            .toString()
            .padStart(2, '0')}`}
        </Row>
      </Col>
    </Row>
  );
}
export default Product;
