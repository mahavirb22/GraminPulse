import React, { useState } from 'react';

/**
 * ActionableAdvisory component using glassmorphism styling and audio action.
 */
export const ActionableAdvisory = ({
  tag = 'AI Advisory',
  timestamp = 'Just now',
  title = 'Weather Warning: Protect Harvest',
  description = 'Unexpected rain is predicted tomorrow afternoon. It is recommended to cover the outdoor grain storage immediately to prevent spoilage.',
  onListen,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleListenClick = () => {
    setIsPlaying(!isPlaying);
    if (onListen) onListen(!isPlaying);
  };

  return (
    <div className="col-span-12 relative rounded-2xl overflow-hidden p-[1px]">
      {/* Subtle Gradient Border wrapper */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed to-primary-container opacity-50 z-0" />
      <div className="glass-panel relative z-10 p-6 w-full h-full flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex gap-4 items-start max-w-2xl">
          <div className="w-12 h-12 rounded-full bg-surface-container flex-shrink-0 flex items-center justify-center border border-outline-variant/30 shadow-sm relative">
            <span className="material-symbols-outlined text-primary font-fill">smart_toy</span>
            <div className="absolute top-0 right-0 w-3 h-3 bg-secondary-fixed rounded-full border-2 border-surface-container-lowest" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label text-xs bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-sm uppercase tracking-widest font-semibold">
                {tag}
              </span>
              <span className="font-label text-xs text-outline">{timestamp}</span>
            </div>
            <h3 className="font-headline text-lg font-semibold text-on-surface mb-1">
              {title}
            </h3>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <button
          onClick={handleListenClick}
          className={`w-full md:w-auto flex items-center justify-center gap-2 font-label text-sm px-6 py-3 rounded-full transition-all shadow-sm flex-shrink-0 active:scale-95 ${
            isPlaying
              ? 'bg-secondary-container text-on-secondary-container font-semibold'
              : 'bg-primary text-on-primary hover:bg-surface-tint'
          }`}
        >
          <span className="material-symbols-outlined">
            {isPlaying ? 'pause_circle' : 'volume_up'}
          </span>
          {isPlaying ? 'Playing Advice...' : 'Listen to Advice'}
        </button>
      </div>
    </div>
  );
};
