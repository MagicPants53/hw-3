import Button from '@/components/Button';
import rootStore from '@/store/RootStore';
import { runInAction } from 'mobx';
import { useNavigate } from 'react-router';

import Text from '@/components/Text';

import styles from './Profile.module.scss';

const Profile = () => {
  const userStore = rootStore.userStore;
  const navigate = useNavigate();

  const handleClick = () => {
    runInAction(() => {
      userStore.logout();
      navigate(`/`);
    });
  };

  return (
    <div className={styles.profile}>
      <Text view="title">Profile ({userStore.user?.username})</Text>
      <Text view="p-20" color="secondary">
        {userStore.user?.email}
      </Text>
      <Button onClick={handleClick}>Log out</Button>
    </div>
  );
};

export default Profile;
