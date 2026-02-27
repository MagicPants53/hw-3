import { Link } from 'react-router';
import { useRef, useState } from 'react';

import { headersLinks } from '@/config/headersLinks';
import { paths } from '@/config/paths';
import { useLockScroll } from '@/App/hooks';

import Logo from '@/components/icons/Logo';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import BurgerIcon from '@/components/icons/BurgerIcon';
import Text from '@/components/Text';
import Modal from '../../Modal';

import styles from './HeaderMobile.module.scss';

const HeaderMobile = ({ ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const modalRef = useRef(null);

  useLockScroll(isMenuOpen, modalRef, () => setIsMenuOpen(false));

  return (
    <header className={props.className}>
      <div>
        <Link to="/">
          <Logo isLong />
        </Link>
      </div>
      <button className={styles.burger_btn} onClick={() => setIsMenuOpen(true)}>
        <BurgerIcon color="accent" />
      </button>
      <Modal isOpen={isMenuOpen} ref={modalRef}>
        <div className={styles.icons}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <Logo />
          </Link>
          <div className={styles.modal_actions}>
            <Link to={paths.cart} onClick={() => setIsMenuOpen(false)}>
              <CartIcon />
            </Link>
            <Link to={paths.user} onClick={() => setIsMenuOpen(false)}>
              <UserIcon />
            </Link>
          </div>
        </div>
        <nav className={styles.modal_tabs}>
          {headersLinks.map((link) => (
            <Link to={link.path} key={link.name} onClick={() => setIsMenuOpen(false)}>
              <Text view="p-20">{link.name}</Text>
            </Link>
          ))}
        </nav>
      </Modal>
    </header>
  );
};

export default HeaderMobile;
