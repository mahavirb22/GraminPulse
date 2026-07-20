import React from 'react';

/**
 * UserAvatar component displaying the capitalized first letter of a user's name inside a colored circle.
 */
export const UserAvatar = ({ name = 'User', size = 'sm', className = '' }) => {
  const initial = (name && name.trim().length > 0 ? name.trim().charAt(0) : 'U').toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-xl',
  }[size] || 'w-8 h-8 text-xs';

  return (
    <div
      className={`${sizeClasses} rounded-full bg-primary-container text-on-primary font-bold font-headline flex items-center justify-center border border-outline-variant/30 shadow-sm shrink-0 uppercase tracking-wider ${className}`}
      title={name}
    >
      {initial}
    </div>
  );
};
