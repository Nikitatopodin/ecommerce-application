import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import styles from './Main.module.css';
import CarouselCard from './carouselCard/CarouselCard';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import homePageCarouselThunk from '../../redux/actions/homePageCarouselThunk';

// interface IProps {
//   cards: string[][];
// }

function HomePageCarousel() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.homePageCarousel.cards);
  useEffect(() => {
    dispatch(homePageCarouselThunk());
  }, []);

  return (
    <Carousel autoplay className={styles.carousel}>
      {cards.map((cardsPack) => (
        <CarouselCard cardsPack={cardsPack} key={Date.now()} />
      ))}
    </Carousel>
  );
}

export default HomePageCarousel;
