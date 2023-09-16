import React, { useState } from 'react';
import { Image } from 'antd';
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
      <Image src={cardsPack[0]} preview={false} className={styles.picture} />
      <Image src={cardsPack[1]} preview={false} className={styles.picture} />
      {isThirdCard && (
        <Image src={cardsPack[2]} preview={false} className={styles.picture} />
      )}
    </div>
  );
}

export default CarouselCard;
