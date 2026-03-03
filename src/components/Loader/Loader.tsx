import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l' | 'xl';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className = '' }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.loader} ${
        size === 's'
          ? styles.loader_small
          : size === 'l'
            ? styles.loader_large
            : size === 'xl'
              ? styles.loader_huge
              : ''
      } ${className}`}
    >
      <path
        d="M23.3787 34.62C15.3067 36.4835 7.25243 31.4506 5.38888 23.3787C3.52532 15.3068 8.55822 7.25244 16.6302 5.38888C24.7021 3.52533 32.7564 8.55822 34.62 16.6302L39.4918 15.5054C37.0071 4.74282 26.268 -1.96771 15.5054 0.517031C4.74281 3.00177 -1.96771 13.7409 0.517027 24.5035C3.00177 35.266 13.7409 41.9766 24.5034 39.4918L23.3787 34.62Z"
        fill="#518581"
      />
    </svg>
  );
};

export default Loader;
