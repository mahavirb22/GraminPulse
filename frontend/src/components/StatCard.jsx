import React from 'react';

/**
 * StatCard component for bento grid stat metrics.
 */
export const StatCard = ({
  title,
  value,
  trend,
  trendPositive = true,
  icon,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <div className={`bento-card p-6 flex flex-col justify-between relative overflow-hidden ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">
            {title}
          </h3>
          <div className="font-headline text-3xl font-bold text-on-surface flex items-baseline gap-2">
            {value}
            {trend && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  trendPositive
                    ? 'bg-primary text-secondary-fixed'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-on-surface-variant mt-1 font-body">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
