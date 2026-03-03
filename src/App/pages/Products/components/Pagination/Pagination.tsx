import type { FC } from 'react';

import Button from '@/components/Button';

import styles from './Pagination.module.scss';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';

type PanginationType = {
  pageCount: number;
  selectedPage: number;
  onChangePage: (page: number) => void;
};

const Pangination: FC<PanginationType> = ({ pageCount, selectedPage, onChangePage }) => {
  return (
    <div className={styles.pagination}>
      <Button
        disabled={selectedPage === 1}
        className={styles.btn}
        onClick={() => onChangePage(selectedPage - 1)}
      >
        <ArrowDownIcon style={{ transform: 'rotate(90deg)' }} />
      </Button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          view={page === selectedPage ? 'normal' : 'ghost'}
          onClick={() => onChangePage(page)}
          className={styles.pageButton}
        >
          {page}
        </Button>
      ))}
      <Button
        disabled={selectedPage === pageCount}
        className={styles.btn}
        onClick={() => onChangePage(selectedPage + 1)}
      >
        <ArrowDownIcon style={{ transform: 'rotate(-90deg)' }} />
      </Button>
    </div>
  );
};

export default Pangination;
