import * as React from 'react';
import Icon, { type IconProps } from '../Icon';

import styles from '../variables.module.scss';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
  const chooseColor = (color: string | undefined) => {
    switch (color) {
      case 'primary':
        return styles.primaryColor;
      case 'secondary':
        return styles.secondaryColor;
      case 'accent':
        return styles.accentColor;
      default:
        return styles.primaryColor;
    }
  };
  return (
    <Icon
      className={props.className ? props.className : ''}
      color={props.color}
      width={props.width ? props.width : '24'}
      height={props.height ? props.height : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={chooseColor(props.color)}
      />
    </Icon>
  );
};

export default ArrowDownIcon;
