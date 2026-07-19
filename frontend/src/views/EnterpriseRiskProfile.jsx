import React, { useState, useEffect } from 'react';
import { RiskBadge } from '../components/RiskBadge';

export const EnterpriseRiskProfile = ({ enterprise, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  /**
   * Use effect hook to simulate fetching deep-dive enterprise risk data,
   * live IoT sensor status, and text advisory summary on component mount.
   */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mock API data response
      setProfileData({
        id: enterprise?.id || '8492-AG',
        name: enterprise?.name || 'Kisan Agro Co.',
        sector: enterprise?.sector || 'Agriculture',
        riskLevel: enterprise?.status || 'elevated',
        projectedDeficit: '-$12,400',
        deficitMonth: 'Dec',
        earlyWarningSignals: [
          {
            id: 1,
            title: 'Missed Payment',
            subtitle: '2 days ago • Invoice #882',
            icon: 'priority_high',
            severity: 'error',
          },
          {
            id: 2,
            title: 'Drought Advisory',
            subtitle: '5 days ago • Region 4',
            icon: 'water_drop',
            severity: 'tertiary',
          },
          {
            id: 3,
            title: 'Inventory Drop',
            subtitle: '12 days ago • -15% WoW',
            icon: 'inventory_2',
            severity: 'neutral',
          },
        ],
        diagnostics: [
          { name: 'Liquidity', status: 'Fair', icon: 'account_balance', variant: 'normal' },
          { name: 'Supply Chain', status: 'Critical', icon: 'local_shipping', variant: 'error' },
          { name: 'Crop Yield', status: 'Stable', icon: 'eco', variant: 'normal' },
          { name: 'Market Price', status: 'Volatile', icon: 'trending_up', variant: 'tertiary' },
        ],
        aiAdvisorySummary:
          'Kisan Agro Co. presents an elevated risk profile due to a severe supply chain disruption and a missed invoice payment. Immediate field officer intervention is recommended to restructure December repayment schedules.',
      });
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [enterprise]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-5 pt-12 pb-24 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-3" />
        <p className="font-body text-sm text-on-surface-variant">Loading enterprise risk diagnostics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 pt-4 pb-24 flex flex-col gap-4">
      {/* Back Navigation Bar */}
      {onBack && (
        <button
          onClick={onBack}
          className="self-start flex items-center gap-1 text-sm font-label text-primary hover:text-surface-tint"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Field Hub
        </button>
      )}

      {/* Header Section */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="font-headline text-3xl font-bold text-primary">{profileData.name}</h1>
            <p className="font-body text-sm text-on-surface-variant">
              Profile ID: #{profileData.id} • Sector: {profileData.sector}
            </p>
          </div>
          <RiskBadge status={profileData.riskLevel} label="Elevated Risk" />
        </div>
      </section>

      {/* AI Text Advisory Summary Box */}
      <div className="bg-primary-container/10 border border-primary-container/30 rounded-2xl p-4 flex gap-3 items-start">
        <span className="material-symbols-outlined text-primary text-xl mt-0.5">psychology</span>
        <div>
          <span className="font-label text-xs font-semibold text-primary uppercase tracking-wider block mb-0.5">
            Diagnostic AI Summary
          </span>
          <p className="font-body text-xs text-on-surface leading-relaxed">
            {profileData.aiAdvisorySummary}
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 3-Month Cash Flow Forecast Card */}
        <div className="bento-card p-4 md:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="font-label text-xs uppercase tracking-wider font-semibold text-secondary">
              3-Month Cash Flow Forecast
            </h3>
            <button className="text-primary hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>

          <div className="h-44 w-full bg-surface-container-lowest rounded-xl border border-outline-variant/20 relative overflow-hidden flex items-end px-4 pt-4 pb-6 gap-2 justify-between">
            {/* Forecast Bars */}
            <div className="flex flex-col items-center justify-end h-full gap-1 w-1/5 z-10">
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[45%] relative">
                <div className="absolute -top-5 w-full text-center font-label text-xs text-on-surface-variant">
                  Oct
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end h-full gap-1 w-1/5 z-10">
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[65%] relative">
                <div className="absolute -top-5 w-full text-center font-label text-xs text-on-surface-variant">
                  Nov
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end h-full gap-1 w-1/5 z-10">
              <div className="w-full bg-error/40 rounded-t-sm h-[30%] relative">
                <div className="absolute -top-5 w-full text-center font-label text-xs font-bold text-error">
                  Dec
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-end h-full gap-1 w-1/5 z-10">
              <div className="w-full bg-secondary-fixed rounded-t-sm h-[55%] relative">
                <div className="absolute -top-5 w-full text-center font-label text-xs text-on-surface-variant">
                  Jan
                </div>
              </div>
            </div>

            {/* Trend Line Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path
                d="M5,60 Q25,40 50,75 T95,50"
                fill="none"
                stroke="#003820"
                strokeDasharray="4,4"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl">
            <span className="font-label text-xs text-on-surface-variant">
              Projected Deficit ({profileData.deficitMonth}):{' '}
              <span className="font-bold text-error">{profileData.projectedDeficit}</span>
            </span>
            <span className="material-symbols-outlined text-error text-[18px]">
              trending_down
            </span>
          </div>
        </div>

        {/* Early Warning Signals Timeline */}
        <div className="bento-card p-4 flex flex-col gap-3">
          <h3 className="font-label text-xs uppercase tracking-wider font-semibold text-secondary border-b border-outline-variant/30 pb-2">
            Early Warning Signals
          </h3>
          <div className="flex flex-col gap-4 relative">
            {/* Vertical Line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-outline-variant/30" />

            {profileData.earlyWarningSignals.map((sig) => (
              <div key={sig.id} className="flex gap-3 relative z-10">
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shrink-0 mt-0.5 ${
                    sig.severity === 'error'
                      ? 'bg-error-container text-error'
                      : sig.severity === 'tertiary'
                      ? 'bg-tertiary-fixed text-tertiary'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">{sig.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-xs font-semibold text-on-surface">
                    {sig.title}
                  </span>
                  <span className="font-body text-xs text-on-surface-variant">{sig.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-auto w-full py-2 bg-secondary-fixed text-primary font-label text-xs font-semibold rounded-xl hover:bg-secondary-fixed-dim transition-colors text-center border border-primary-fixed">
            View Full History
          </button>
        </div>

        {/* Risk Diagnostic Grid */}
        <div className="bento-card p-4 flex flex-col gap-3">
          <h3 className="font-label text-xs uppercase tracking-wider font-semibold text-secondary border-b border-outline-variant/30 pb-2">
            Risk Diagnostics
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {profileData.diagnostics.map((diag) => (
              <div
                key={diag.name}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 ${
                  diag.variant === 'error'
                    ? 'bg-error-container/20 border-error/20'
                    : diag.variant === 'tertiary'
                    ? 'bg-tertiary-fixed/30 border-tertiary-fixed'
                    : 'bg-surface-container-low border-outline-variant/20'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    diag.variant === 'error'
                      ? 'text-error'
                      : diag.variant === 'tertiary'
                      ? 'text-tertiary'
                      : 'text-primary'
                  }`}
                >
                  {diag.icon}
                </span>
                <span className="font-label text-xs text-on-surface-variant">{diag.name}</span>
                <span
                  className={`font-label text-xs font-bold ${
                    diag.variant === 'error'
                      ? 'text-error'
                      : diag.variant === 'tertiary'
                      ? 'text-tertiary'
                      : 'text-on-surface'
                  }`}
                >
                  {diag.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
