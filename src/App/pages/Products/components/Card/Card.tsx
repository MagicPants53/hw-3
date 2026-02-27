import React from 'react';

import Text from 'components/Text';

import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className = '',
  image = '',
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {image !== '' ? <img className={styles.card_img} alt="" src={image} /> : null}
      <div className={styles.card_body}>
        <div className={styles.card_content}>
          {captionSlot ? (
            <Text view="p-14" color="secondary">
              {captionSlot}
            </Text>
          ) : null}
          <Text view="p-20" maxLines={2} weight="medium">
            {title}
          </Text>
          <Text view="p-16" maxLines={3} color="secondary">
            {subtitle}
          </Text>
        </div>
        <div className={styles.card_footer}>
          {contentSlot ? (
            <div className={styles.contentSlot}>
              <Text view="p-18" weight="bold">
                {contentSlot}
              </Text>
            </div>
          ) : null}
          <div className={styles.actionSlot}>{actionSlot}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
