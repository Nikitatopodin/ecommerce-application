import React from 'react';
import { Carousel } from 'antd';
import { Image, TypedMoney } from '@commercetools/platform-sdk';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
  productInfo: {
    name: string;
    images: Image[] | undefined;
    description: string;
    prices: (TypedMoney | undefined)[][];
  };
  setProductModalOpen?: (isProductModalOpen: boolean) => void;
  style: React.CSSProperties;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: 160,
  width: '25vw',
  textAlign: 'center',
  background: '#364d79',
};

function ProductCarousel({ productInfo, setProductModalOpen, style }: IProps) {
  return (
    <Carousel autoplay style={style} dots={{ className: 'dots' }}>
      <LazyLoadImage
        src={productInfo.images![0].url}
        style={contentStyle}
        className="product-img"
        onClick={() => setProductModalOpen && setProductModalOpen(true)}
      />
      <LazyLoadImage
        src={productInfo.images![1].url}
        style={contentStyle}
        className="product-img"
        onClick={() => setProductModalOpen && setProductModalOpen(true)}
      />
    </Carousel>
  );
}

export default ProductCarousel;
