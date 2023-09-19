import React from 'react';
import { Carousel } from 'antd';
import { Image, TypedMoney } from '@commercetools/platform-sdk';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface IProps {
  productInfo: {
    name: string;
    images: Image[] | undefined;
    description: string;
    prices: (TypedMoney | undefined)[][];
  };
  style: React.CSSProperties;
  setProductModalOpen?: (isProductModalOpen: boolean) => void;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  color: '#fff',
  lineHeight: 160,
  width: '25vw',
  textAlign: 'center',
  background: '#364d79',
};

function ProductCarousel({ productInfo, style, setProductModalOpen }: IProps) {
  return (
    <Carousel autoplay style={style} dots={{ className: 'dots' }}>
      <LazyLoadImage
        effect="blur"
        src={productInfo.images![0].url}
        style={contentStyle}
        className="product-img"
        onClick={() => setProductModalOpen && setProductModalOpen(true)}
      />
      <LazyLoadImage
        effect="blur"
        src={productInfo.images![1].url}
        style={contentStyle}
        className="product-img"
        onClick={() => setProductModalOpen && setProductModalOpen(true)}
      />
    </Carousel>
  );
}

export default ProductCarousel;

ProductCarousel.defaultProps = {
  setProductModalOpen: undefined,
};
