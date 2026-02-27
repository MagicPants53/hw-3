import { type FC } from 'react';

import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
};

const Modal: FC<ModalProps> = ({ isOpen, children, ref }) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} ref={ref}>
      <div className={styles.modal_content}>{children}</div>
    </div>
  );
};

export default Modal;
