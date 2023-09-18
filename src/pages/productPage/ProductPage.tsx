import './ProductPage.css';
import { Button, Col, Row, Image, Carousel, Modal, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { useLoaderData } from 'react-router-dom';
import updateCartThunk from '../../redux/actions/updateCartThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import removeCartItemThunk from '../../redux/actions/removeCartItemThunk';

const { Title, Text } = Typography;
const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: '160px',
  width: '25vw',
  textAlign: 'center',
  background: '#364d79',
};

const productCarouselStyle: React.CSSProperties = {
  backgroundColor: 'black',
  maxWidth: '350px',
  width: '40vw',
  marginTop: '10px',
  marginLeft: 'auto',
};

function ProductPage() {
  const productData: ProductProjection = useLoaderData() as ProductProjection;
  const [open, setOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState(0);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);

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
  const getProductId = (element: LineItem) =>
    element.productId === productData.id &&
    element.variant.id === currentSize + 1;

  const addItemToCart = () => {
    dispatch(
      updateCartThunk(
        cart!.version,
        productData.id,
        currentSize + 1,
        1,
        cart!.id,
      ),
    );
  };
  const removeItemFromCart = () => {
    dispatch(
      removeCartItemThunk(
        cart!.version,
        cart!.id,
        cart!.lineItems.find(getProductId)!.id,
        'USD',
        productInfo.prices[currentSize][0]!.centAmount,
      ),
    );
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
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

  useEffect(() => {}, [currentSize]);

  return (
    <Row gutter={[20, 20]} justify="center" className="wrapper">
      <Col className="product-left">
        <Carousel
          autoplay
          style={productCarouselStyle}
          dots={{ className: 'dots' }}
        >
          <Image
            src={productInfo.images![0].url}
            style={contentStyle}
            preview={false}
            className="product-img"
            onClick={showModal}
          />
          <Image
            src={productInfo.images![1].url}
            style={contentStyle}
            preview={false}
            className="product-img"
            onClick={showModal}
          />
        </Carousel>
        <Modal
          open={open}
          title={productInfo.name}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          destroyOnClose
        >
          <Carousel
            style={{
              backgroundColor: 'black',
              width: '100%',
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
        style={{ marginTop: '2.5rem', paddingLeft: '10px' }}
        className="product-info"
      >
        <Title level={2}>{productInfo.name}</Title>
        <Row gutter={10}>
          <Col>
            <Button
              type={currentSize === 0 ? 'primary' : 'default'}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              {productData.masterVariant.attributes![1].value.label}
            </Button>
          </Col>
          <Col>
            <Button
              type={currentSize === 1 ? 'primary' : 'default'}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              {productData.variants[0].attributes![1].value.label}
            </Button>
          </Col>
        </Row>
        <Text style={{ margin: '10px 0' }}>{productInfo.description}</Text>
        <Row style={{ margin: '10px 0' }}>
          <Text>Price:&nbsp;</Text>
          <div style={{ display: 'flex', gap: '10px' }}>
            {productInfo.prices[currentSize][1] && (
              <Text className="price">
                {(
                  productInfo.prices[currentSize][1]!.centAmount / 100
                ).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            )}
            <Text
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
            </Text>
          </div>
        </Row>
        <Button
          onClick={
            cart?.lineItems.some(getProductId)
              ? removeItemFromCart
              : addItemToCart
          }
        >
          {cart?.lineItems.some(getProductId)
            ? 'Remove from Cart'
            : 'Add to Cart'}
        </Button>
      </Col>
    </Row>
  );
}

export default ProductPage;
