import { Link } from 'react-router';

import { headersLinks } from '@/config/headersLinks';
import { paths } from '@/config/paths';

import Logo from '@/components/icons/Logo';
import Text from '@/components/Text';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';

import styles from './HeaderDesktop.module.scss';

const HeaderDesktop = ({ ...props }) => {
  return (
    <header className={props.className}>
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
        <Link to={paths.cart}>
          <CartIcon />
        </Link>
        <Link to={paths.user}>
          <UserIcon />
        </Link>
      </div>
    </header>
  );
};

export default HeaderDesktop;
