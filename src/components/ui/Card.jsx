import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'card';
  const variantClass = `card-${variant}`;
  
  return (
    <div className={`${baseClasses} ${variantClass} ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`card-title ${className}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = '' }) => {
  return (
    <p className={`card-description ${className}`}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`card-content ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
export default Card;

