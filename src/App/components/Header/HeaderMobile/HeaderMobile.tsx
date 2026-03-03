import { Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState, type FC } from 'react';
import { runInAction } from 'mobx';

import { headersLinks } from '@/config/headersLinks';
import { paths } from '@/config/paths';
import { useLockScroll } from '@/App/hooks';

import { Meta } from '@/shared/utils/meta';

import Logo from '@/components/icons/Logo';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import BurgerIcon from '@/components/icons/BurgerIcon';
import Text from '@/components/Text';
import Modal from '../../Modal';
import AuthModal from '../../AuthModal';

import rootStore from '@/store/RootStore';

import styles from './HeaderMobile.module.scss';
import { observer } from 'mobx-react-lite';

type HeaderMobileProps = {
  className?: string;
};

const HeaderMobile: FC<HeaderMobileProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const userStore = rootStore.userStore;
  const cartStore = rootStore.cartStore;

  useEffect(() => {
    cartStore.loadCart();
    setShowAuthModal(false);
  }, [userStore.isAuth]);

  useLockScroll(isMenuOpen, () => setIsMenuOpen(false), menuRef);
  useLockScroll(showAuthModal, () => setIsMenuOpen(false));

  const handleUserClick = () => {
    setIsMenuOpen(false);
    runInAction(() => {
      if (userStore.isAuth) {
        navigate(paths.profile);
      } else {
        setShowAuthModal(true);
      }
    });
  };

  const handleCartClick = () => {
    setIsMenuOpen(false);
    runInAction(() => {
      navigate(paths.cart);
    });
  };

  return (
    <>
      <header className={className}>
        <div>
          <Link to="/">
            <Logo isLong />
          </Link>
        </div>

        <button className={styles.burger_btn} onClick={() => setIsMenuOpen(true)}>
          <BurgerIcon color="accent" />
        </button>

        <Modal isOpen={isMenuOpen} ref={menuRef}>
          <div className={styles.icons}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Logo />
            </Link>
            <div className={styles.modal_actions}>
              <button onClick={handleCartClick} className={styles.cartBtn} title="Корзина">
                <CartIcon />
                {cartStore.totalItems > 0 && (
                  <Text weight={'bold'} className={styles.cartBadge}>
                    {cartStore.totalItems}
                  </Text>
                )}
              </button>
              <button onClick={handleUserClick} className={styles.userBtn} title="Профиль">
                <UserIcon />
                {userStore.isAuth && userStore.user && (
                  <Text weight={'bold'} className={styles.userInitials}>
                    {userStore.user.username.slice(0, 2).toUpperCase()}
                  </Text>
                )}
              </button>
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
      {showAuthModal && userStore.meta !== Meta.success && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default observer(HeaderMobile);
