import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import Logo from '@/components/icons/Logo';
import Text from '@/components/Text';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import BurgerIcon from '@/components/icons/BurgerIcon';

import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && menuRef.current === event.target) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <Logo isLong />
        </Link>
      </div>

      <nav className={styles.tabs}>
        <Link to="/products">
          <Text view="p-18">Products</Text>
        </Link>
        <Link to="/categories">
          <Text view="p-18">Categories</Text>
        </Link>
        <Link to="/about_us">
          <Text view="p-18">About us</Text>
        </Link>
      </nav>
      <div className={styles.actions}>
        <Link to="/cart">
          <CartIcon />
        </Link>
        <Link to="/user">
          <UserIcon />
        </Link>
      </div>

      <div className={styles.burger}>
        <button className={styles.burger_btn} onClick={() => setIsMenuOpen(true)}>
          <BurgerIcon color="accent" />
        </button>

        <div className={`${styles.modal} ${isMenuOpen ? styles.open : ''}`} ref={menuRef}>
          <div className={styles.modal_content}>
            <div className={styles.icons}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Logo />
              </Link>
              <div className={styles.actions}>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                  <CartIcon />
                </Link>
                <Link to="/user" onClick={() => setIsMenuOpen(false)}>
                  <UserIcon />
                </Link>
              </div>
            </div>
            <nav className={styles.tabs}>
              <Link to="/products" onClick={() => setIsMenuOpen(false)}>
                <Text view="p-20">Products</Text>
              </Link>
              <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
                <Text view="p-20">Categories</Text>
              </Link>
              <Link to="/about_us" onClick={() => setIsMenuOpen(false)}>
                <Text view="p-20">About us</Text>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
