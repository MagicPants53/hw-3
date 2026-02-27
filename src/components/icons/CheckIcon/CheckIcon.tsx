import * as React from 'react';
import Icon, { type IconProps } from '../Icon';

import styles from '../variables.module.scss';

const CheckIcon: React.FC<IconProps> = (props) => {
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
      <path d="M4 11.6129L9.87755 18L20 7" stroke={chooseColor(props.color)} strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
