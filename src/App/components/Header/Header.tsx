import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <HeaderDesktop className={styles.header_desktop} />
      <HeaderMobile className={styles.header_mobile} />
    </>
  );
};

export default Header;
