import { FunctionComponent, SyntheticEvent, memo } from 'react';

interface ButtonProps {
  type?: any;
  children: any;
  onClick: Function;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: 'TEXT' | 'CONTAINED' | 'OUTLINED';
}

const noop = () => {};
const getVariantClassNames = (variant: 'TEXT' | 'CONTAINED' | 'OUTLINED') => {
  const variants = {
    TEXT: 'bg-transparent',
    CONTAINED: 'bg-gray-500',
    OUTLINED: 'border-2 border-gray-500 bg-transparent',
  };

  return variants?.[variant] || variants.TEXT;
};

const Button: FunctionComponent<ButtonProps> = ({
  type = 'button',
  children,
  onClick = noop,
  loading = false,
  disabled = false,
  className = '',
  variant = 'CONTAINED',
}) => {
  const handleClick = (e: SyntheticEvent) => {
    if (!loading && !disabled) return onClick(e);
    return null;
  };

  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={`${className} ${getVariantClassNames(variant)} text-white p-2 leading-5 transition duration-150 ease-in-out group hover:bg-opacity-90 focus:outline-none ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default memo(Button);
