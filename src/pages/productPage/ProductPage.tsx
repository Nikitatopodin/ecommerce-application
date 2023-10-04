import './ProductPage.css';
import { Button, Col, Modal, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { useLoaderData } from 'react-router-dom';
import updateCartThunk from '../../redux/actions/updateCartThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import removeCartItemThunk from '../../redux/actions/removeCartItemThunk';
import ProductCarousel from './productCarousel/ProductCarousel';

const { Title, Text } = Typography;

const productCarouselStyle: React.CSSProperties = {
  maxWidth: 350,
  width: '40vw',
  marginTop: 10,
  marginLeft: 'auto',
};

const productCarouselPreviewStyle: React.CSSProperties = {
  width: '100%',
};

function ProductPage() {
  const productData: ProductProjection = useLoaderData() as ProductProjection;
  const [isProductModalOpen, setProductModalOpen] = useState(false);
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

  const handleCancel = () => {
    setProductModalOpen(false);
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

  return (
    <Row gutter={[20, 20]} justify="center" className="wrapper">
      <Col className="product-left">
        <ProductCarousel
          productInfo={productInfo}
          style={productCarouselStyle}
          setProductModalOpen={setProductModalOpen}
        />
        <Modal
          open={isProductModalOpen}
          title={productInfo.name}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          destroyOnClose
        >
          <ProductCarousel
            productInfo={productInfo}
            style={productCarouselPreviewStyle}
          />
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
              {productData.masterVariant.attributes![0].value.label}
            </Button>
          </Col>
          <Col>
            <Button
              type={currentSize === 1 ? 'primary' : 'default'}
              onClick={(e) => onSizeButtonClick(e.target)}
            >
              {productData.variants[0].attributes![0].value.label}
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
