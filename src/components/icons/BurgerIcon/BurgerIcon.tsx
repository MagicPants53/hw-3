import * as React from 'react';
import Icon, { type IconProps } from '../Icon';

import styles from '../variables.module.scss';

const BurgerIcon: React.FC<IconProps> = (props) => {
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
      width={props.width ? props.width : '27'}
      height={props.height ? props.height : '21'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M27 0V4.45455H0V0H27Z" fill={chooseColor(props.color)} />
      <path d="M27 8.27273V12.7273H0V8.27273H27Z" fill={chooseColor(props.color)} />
      <path d="M27 16.5455V21H0V16.5455H27Z" fill={chooseColor(props.color)} />
    </Icon>
  );
};

export default BurgerIcon;
