import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from './CarouselCard.module.css';

interface IProps {
  cardsPack: string[];
}

function CarouselCard({ cardsPack }: IProps) {
  const [isThirdCard, setThirdCard] = useState(window.innerWidth > 600);
  window.addEventListener('resize', () =>
    setThirdCard(window.innerWidth > 600),
  );
  return (
    <div className={styles.cardsWrapper}>
      <LazyLoadImage
        effect="blur"
        src={cardsPack[0]}
        className={styles.picture}
      />
      <LazyLoadImage
        effect="blur"
        src={cardsPack[1]}
        className={styles.picture}
      />
      {isThirdCard && (
        <LazyLoadImage
          effect="blur"
          src={cardsPack[2]}
          className={styles.picture}
        />
      )}
    </div>
  );
}

export default CarouselCard;
