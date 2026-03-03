import { observer } from 'mobx-react-lite';
import { useEffect, useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router';
import { runInAction } from 'mobx';

import { paths } from '@/config/paths';
import { headersLinks } from '@/config/headersLinks';

import Logo from '@/components/icons/Logo';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import Text from '@/components/Text';
import AuthModal from '../../AuthModal/AuthModal';

import rootStore from '@/store/RootStore';

import { Meta } from '@/shared/utils/meta';

import styles from './HeaderDesktop.module.scss';
import { useLockScroll } from '@/App/hooks';

type HeaderDesktopProps = {
  className?: string;
};

const HeaderDesktop: FC<HeaderDesktopProps> = ({ className }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const userStore = rootStore.userStore;
  const cartStore = rootStore.cartStore;

  useEffect(() => {
    cartStore.loadCart();
    setShowAuthModal(false);
  }, [userStore.isAuth]);

  useLockScroll(showAuthModal, () => setShowAuthModal(false));

  const handleUserClick = () => {
    runInAction(() => {
      if (userStore.isAuth) {
        navigate(paths.profile);
      } else {
        setShowAuthModal(true);
      }
    });
  };

  const handleCartClick = () => {
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

        <nav className={styles.tabs}>
          {headersLinks.map((link) => (
            <Link to={link.path} key={link.name}>
              <Text view="p-18">{link.name}</Text>
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
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
      </header>

      {showAuthModal && userStore.meta !== Meta.success && (
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default observer(HeaderDesktop);
