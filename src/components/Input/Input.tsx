import React from 'react';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value?: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...props }, ref) => {
    return (
      <div className={`${styles.inputContainer} ${props.className ? props.className : ''}`}>
        <input
          ref={ref}
          className={styles.input}
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent) => onChange((e.target as HTMLInputElement).value)}
          {...props}
        />
        {afterSlot ? <div className={styles.inputAfterSlot}>{afterSlot}</div> : null}
      </div>
    );
  }
);

export default Input;
