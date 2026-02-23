import React from 'react';

import './Input.css';

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
      <div className={`input-container ${props.className ? props.className : ''}`}>
        <input
          ref={ref}
          {...props}
          className="input"
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent) => onChange((e.target as HTMLInputElement).value)}
        />
        {afterSlot ? <div className="input-after-slot">{afterSlot}</div> : null}
      </div>
    );
  }
);

export default Input;
