import React from 'react';
import { Carousel } from 'antd';
import styles from './Carousel.module.css';
import CarouselCard from './carouselCard/CarouselCard';
import pic1 from '../../../assets/images/mainPageCarousel/carousel-1.jpeg';
import pic2 from '../../../assets/images/mainPageCarousel/carousel-2.jpeg';
import pic3 from '../../../assets/images/mainPageCarousel/carousel-3.jpeg';
import pic4 from '../../../assets/images/mainPageCarousel/carousel-4.jpeg';
import pic5 from '../../../assets/images/mainPageCarousel/carousel-5.jpeg';
import pic6 from '../../../assets/images/mainPageCarousel/carousel-6.png';
import pic7 from '../../../assets/images/mainPageCarousel/carousel-7.jpeg';
import pic8 from '../../../assets/images/mainPageCarousel/carousel-9.jpeg';
import pic9 from '../../../assets/images/mainPageCarousel/carousel-8.jpeg';

function HomePageCarousel() {
  const cards = [
    [pic1, pic2, pic3],
    [pic4, pic5, pic6],
    [pic7, pic8, pic9],
  ];
  return (
    <Carousel autoplay dots={false} className={styles.carousel}>
      {cards.map((cardsPack) => (
        <CarouselCard cardsPack={cardsPack} key={Date.now()} />
      ))}
    </Carousel>
  );
}

export default HomePageCarousel;
