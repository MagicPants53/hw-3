import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <svg className={className} {...props}>
      {children}
    </svg>
  );
};

export default Icon;
