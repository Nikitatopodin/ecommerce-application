import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LineItem, ProductProjection } from '@commercetools/platform-sdk';
import updateCartThunk from '../../../../../redux/actions/updateCartThunk';
import removeCartItemThunk from '../../../../../redux/actions/removeCartItemThunk';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import styles from '../../Сatalog.module.css';
import picture from '../../../../../assets/images/mainPageCarousel/carousel-1.jpeg';

const { Meta } = Card;

interface IProps {
  item: ProductProjection;
}

function ProductCard({ item }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);

  const getProductId = (element: LineItem, id: string) =>
    element.productId === id;

  const addItemToCart = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    dispatch(updateCartThunk(cart!.version, id, 1, 1, cart!.id));
  };

  const removeItemFromCart = (
    event: React.MouseEvent,
    id: string,
    price: number,
  ) => {
    event.stopPropagation();
    dispatch(
      removeCartItemThunk(
        cart!.version,
        cart!.id,
        cart!.lineItems.find((elemnt) => getProductId(elemnt, String(id)))!.id,
        'USD',
        price,
      ),
    );
  };

  return (
    <Card
      hoverable
      className={styles.card}
      onClick={() => navigate(item.id!)}
      cover={
        item.masterVariant.scopedPriceDiscounted ? (
          <Badge.Ribbon
            text={item.masterVariant.scopedPriceDiscounted && 'Sale'}
            color={item.masterVariant.scopedPriceDiscounted && 'red'}
          >
            <LazyLoadImage
              alt="example"
              effect="blur"
              src={item.masterVariant!.images![0].url}
              className={styles.picture}
            />
          </Badge.Ribbon>
        ) : (
          <LazyLoadImage
            alt="example"
            effect="blur"
            src={picture}
            className={styles.picture}
          />
        )
      }
    >
      <Meta
        title={item.name['en-US']}
        description={item.description!['en-US']}
      />
      <div className={styles.priceWrapper}>
        {item.masterVariant.scopedPriceDiscounted && (
          <div className={styles.price}>
            {(
              item.masterVariant.price!.discounted!.value.centAmount / 100
            ).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        )}
        <div
          className={
            item.masterVariant.scopedPriceDiscounted
              ? styles.priceOld
              : styles.price
          }
        >
          {(item.masterVariant.price!.value.centAmount / 100).toLocaleString(
            'en-US',
            {
              style: 'currency',
              currency: 'USD',
            },
          )}
        </div>
      </div>
      <Button
        style={{ marginTop: '1em' }}
        onClick={(event) =>
          cart?.lineItems.some((element) =>
            getProductId(element, String(item.id)),
          )
            ? removeItemFromCart(
                event,
                String(item.id),
                item.masterVariant.price!.value.centAmount,
              )
            : addItemToCart(event, String(item.id))
        }
      >
        {cart?.lineItems.some((element) =>
          getProductId(element, String(item.id)),
        )
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </Card>
  );
}

export default ProductCard;
