import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Text from '../Text';

import styles from './Button.module.scss';
import Loader from '../Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsLoading(!!loading);
  }, [loading]);

  return (
    <button
      {...props}
      className={classNames(styles.button, props.className, {
        btn_pressed: isPressed && !isLoading,
        btn_over: !isPressed && isHovered && !isLoading,
        btn_disabled: props.disabled,
      })}
      disabled={isLoading || props.disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? <Loader size="s" /> : null}
      <Text view="button" maxLines={1}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
