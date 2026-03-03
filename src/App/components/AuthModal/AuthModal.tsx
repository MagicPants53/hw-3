import { observer } from 'mobx-react-lite';
import { useEffect, useState, type FC } from 'react';

import Text from '@/components/Text';
import Input from '@/components/Input';
import Button from '@/components/Button';

import { Meta } from '@/shared/utils/meta';

import rootStore from '@/store/RootStore';

import styles from './AuthModal.module.scss';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModalContent: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '', username: '' });

  const userStore = rootStore.userStore;
  const meta = userStore.meta;
  const errorMsg = userStore.errorMsg;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      userStore.login(form.email, form.password);
    } else {
      userStore.register(form.username, form.email, form.password);
    }
  };

  const handleClose = () => {
    if (meta !== Meta.loading) {
      onClose();
    }
  };

  useEffect(() => {
    if (meta === Meta.success) {
      const timer = setTimeout(onClose, 1500);
      return () => clearTimeout(timer);
    }
  }, [meta, onClose]);

  if (meta === Meta.success || !isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Text view="title">{mode === 'login' ? 'Log in' : 'Create an account'}</Text>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(value) => setForm({ ...form, username: value })}
              autoComplete="username"
              required
            />
          )}

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(value) => setForm({ ...form, email: value })}
            autoComplete={mode === 'login' ? 'email' : 'email'}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(value) => setForm({ ...form, password: value })}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
          />

          <Button
            type="submit"
            disabled={meta === Meta.loading || !form.email || !form.password}
            loading={meta === Meta.loading}
          >
            {meta === Meta.loading ? 'Loading...' : mode === 'login' ? 'Log in' : 'Register'}
          </Button>
        </form>

        {meta === Meta.error && (
          <div className={styles.error}>
            <Text>{errorMsg}</Text>
          </div>
        )}

        <div className={styles.modalToggle}>
          <Text view="p-14" color="secondary">
            {mode === 'login' ? 'No account?' : 'Have an account?'}
          </Text>
          <Button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Create an account' : 'Log in'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(AuthModalContent);
