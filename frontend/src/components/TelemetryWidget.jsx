import React from 'react';

/**
 * TelemetryWidget component to display real-time sensor/IoT telemetry data.
 */
export const TelemetryWidget = ({
  title,
  subtitle,
  value,
  statusLabel = 'Stable',
  isAlert = false,
  icon = 'sensors',
  onInspect,
}) => {
  return (
    <div
      className={`bento-card p-4 flex items-center justify-between transition-colors ${
        isAlert ? 'border-error/30 bg-error-container/10' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isAlert
              ? 'bg-error-container text-error'
              : 'bg-surface-container text-primary'
          }`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <div className="font-label text-sm font-semibold text-on-surface">{title}</div>
          <div className="font-body text-xs text-on-surface-variant">{subtitle}</div>
        </div>
      </div>
      <div className="text-right flex flex-col items-end">
        <div
          className={`font-headline text-lg font-semibold ${
            isAlert ? 'text-error flex items-center gap-1' : 'text-on-surface'
          }`}
        >
          {isAlert && <span className="material-symbols-outlined text-sm">warning</span>}
          {value}
        </div>
        {isAlert ? (
          <button
            onClick={onInspect}
            className="font-label text-xs text-on-surface bg-surface-variant px-2 py-0.5 rounded-full inline-block mt-1 hover:bg-surface-dim transition-colors"
          >
            Inspect
          </button>
        ) : (
          <span className="font-label text-xs text-secondary-fixed bg-primary px-2 py-0.5 rounded-full inline-block mt-1">
            {statusLabel}
          </span>
        )}
      </div>
    </div>
  );
};
