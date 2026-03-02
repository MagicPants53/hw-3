import type { FC } from 'react';

import Button from '@/components/Button';

import styles from './Pangination.module.scss';

type PanginationType = {
  pageCount: number;
  onChangePage: (page: number) => void;
};

const Pangination: FC<PanginationType> = ({ pageCount, onChangePage }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
        <Button key={page} onClick={() => onChangePage(page)} className={styles.pageButton}>
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pangination;
