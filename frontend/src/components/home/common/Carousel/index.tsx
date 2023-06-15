import { useEffect, useState } from "react";
import Image from 'next/image';

import styles from './styles.module.css';

export type CarouselSlideType = {
  type: string;
  content: string;
}

type CarouselProps = {
  slides: CarouselSlideType[];
}

export function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeSlide = (index: number) => {
    setCurrentIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === slides.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 5000);

    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {slides[currentIndex].type === 'text' && (
          <p className={styles.itemText}>
            {slides[currentIndex].content.toString()}
          </p>
        )}
        {slides[currentIndex].type === 'image' && (
          <Image src={slides[currentIndex].content} alt="Diagrama" />
        )}
      </div>

      <div className={styles.footer}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${currentIndex !== index && styles.dotActive} ${styles.dot}`}
            onClick={() => handleChangeSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}