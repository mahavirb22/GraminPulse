import React from 'react';

/**
 * RiskBadge component to render risk/status chips with consistent styling.
 * @param {Object} props
 * @param {'stable' | 'warning' | 'action' | 'elevated' | string} props.status - Severity or status type
 * @param {string} [props.label] - Custom text override
 * @param {string} [props.className] - Additional Tailwind classes
 */
export const RiskBadge = ({ status = 'stable', label, className = '' }) => {
  const getBadgeStyle = () => {
    switch (status.toLowerCase()) {
      case 'stable':
        return {
          bg: 'bg-primary-fixed text-on-primary-fixed border-primary-fixed-dim/50',
          text: label || 'Stable',
          icon: null,
        };
      case 'warning':
        return {
          bg: 'bg-[#fff3cd] text-[#856404] border-[#ffeeba]/50',
          text: label || 'Warning',
          icon: null,
        };
      case 'action':
      case 'critical':
        return {
          bg: 'bg-error-container text-on-error-container border-error/20',
          text: label || 'Action Required',
          icon: null,
        };
      case 'elevated':
      case 'elevated risk':
        return {
          bg: 'bg-error-container text-on-error-container border-error/20',
          text: label || 'Elevated Risk',
          icon: 'warning',
        };
      default:
        return {
          bg: 'bg-surface-container text-on-surface border-outline-variant/30',
          text: label || status,
          icon: null,
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold border font-label ${style.bg} ${className}`}
    >
      {style.icon && (
        <span className="material-symbols-outlined text-[14px] fill">
          {style.icon}
        </span>
      )}
      {style.text}
    </span>
  );
};
