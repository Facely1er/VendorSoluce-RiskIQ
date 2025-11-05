import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  title,
}) => {
  const baseClasses = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const disabledClass = disabled ? 'button-disabled' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;

