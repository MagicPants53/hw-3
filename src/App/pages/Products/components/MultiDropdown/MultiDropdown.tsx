import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Text from 'components/Text';

import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className = '',
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  );

  const isSelected = useCallback(
    (option: Option) => {
      return value.some((selected) => selected.key === option.key);
    },
    [value]
  );

  const toggleOption = (option: Option) => {
    const newValue = isSelected(option)
      ? value.filter((selected) => selected.key !== option.key)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <div ref={containerRef} className={`${styles.multiDropdown} ${className}`}>
      <Input
        disabled={disabled}
        value={value.length > 0 ? getTitle(value) : search}
        onChange={(value) => {
          setSearch(value);
        }}
        placeholder={getTitle(value)}
        afterSlot={<ArrowDownIcon style={{ cursor: 'pointer' }} color="secondary" />}
        onClick={() => (!disabled ? setIsOpen(true) : null)}
      />
      {isOpen && !disabled && filteredOptions.length > 0 && (
        <div className={styles.dropdownOptions}>
          {filteredOptions.map((option) => (
            <div
              className={styles.dropdownItem}
              key={option.key}
              onClick={() => toggleOption(option)}
            >
              <Text view="p-16" color={isSelected(option) ? 'accent' : 'primary'}>
                {option.value}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
