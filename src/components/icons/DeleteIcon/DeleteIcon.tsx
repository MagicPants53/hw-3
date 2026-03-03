import * as React from 'react';
import Icon, { type IconProps } from '../Icon';

import styles from '../variables.module.scss';

const DeleteIcon: React.FC<IconProps> = (props) => {
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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g xmlns="http://www.w3.org/2000/svg" fill="none" fillRule="evenodd">
        <path
          d="m19 0c3.3137085 0 6 2.6862915 6 6h6c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1l-3-.001v18.001c0 3.3137085-2.6862915 6-6 6h-12c-3.3137085 0-6-2.6862915-6-6v-18h-3c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1h6c0-3.3137085 2.6862915-6 6-6zm7 8h-20v18c0 2.1421954 1.68396847 3.8910789 3.80035966 3.9951047l.19964034.0048953h12c2.1421954 0 3.8910789-1.6839685 3.9951047-3.8003597l.0048953-.1996403zm-13 6c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm6 0c.5522847 0 1 .4477153 1 1v7c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-7c0-.5522847.4477153-1 1-1zm0-12h-6c-2.1421954 0-3.89107888 1.68396847-3.99510469 3.80035966l-.00489531.19964034h7 7c0-2.14219539-1.6839685-3.89107888-3.8003597-3.99510469z"
          fill={chooseColor(props.color)}
          fillRule="nonzero"
        />
      </g>
    </Icon>
  );
};

export default DeleteIcon;
