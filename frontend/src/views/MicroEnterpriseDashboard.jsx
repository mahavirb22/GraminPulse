import React, { useState } from 'react';
import { ActionableAdvisory } from '../components/ActionableAdvisory';
import { TelemetryWidget } from '../components/TelemetryWidget';
import { TransactionModal } from '../components/TransactionModal';

export const MicroEnterpriseDashboard = ({ onNavigateToProfile }) => {
  const [modalState, setModalState] = useState({ isOpen: false, type: 'income' });
  const [reportGenerated, setReportGenerated] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'income', amount: 42500, category: 'Milk Supply', date: 'Today, 09:30 AM' },
    { id: 2, type: 'expense', amount: 3200, category: 'Cattle Feed', date: 'Yesterday' },
  ]);

  /**
   * Placeholder API function to handle transaction submissions.
   * Connects to Node.js / Express backend in full MERN stack.
   */
  const handleTransactionSubmit = async (transactionData) => {
    console.log('[API Call Placeholder] Submitting transaction to backend:', transactionData);

    // Simulate API network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update local state with new transaction
    const newTx = {
      id: Date.now(),
      ...transactionData,
      date: 'Just now',
    };
    setRecentTransactions((prev) => [newTx, ...prev]);
  };

  const handleGenerateReport = () => {
    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="px-5 py-4 max-w-7xl mx-auto flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-6">
      {/* Welcome Header */}
      <div className="col-span-12 mb-2">
        <h1 className="font-headline text-3xl font-bold text-primary">Overview</h1>
        <p className="font-body text-base text-on-surface-variant">
          Here's your micro-enterprise financial & telemetry summary for today.
        </p>
      </div>

      {/* Cash Flow Bento Card (8 Cols on Desktop) */}
      <div className="bento-card col-span-12 lg:col-span-8 p-6 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
              Cash Flow
            </h2>
            <div className="font-headline text-3xl font-bold text-on-surface flex items-baseline gap-2">
              ₹42,500{' '}
              <span className="font-label text-xs font-semibold text-secondary-fixed bg-primary px-2.5 py-0.5 rounded-full">
                +12% vs last month
              </span>
            </div>
          </div>
          <button className="text-primary p-1.5 bg-surface-container-low rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        {/* Cash Flow SVG Chart */}
        <div className="relative w-full h-48 mt-auto flex-grow">
          <div className="absolute inset-0 flex flex-col justify-between">
            <div className="border-b border-surface-variant w-full h-0" />
            <div className="border-b border-surface-variant w-full h-0" />
            <div className="border-b border-surface-variant w-full h-0" />
            <div className="border-b border-surface-variant w-full h-0" />
          </div>

          <svg
            className="absolute inset-0 w-full h-full preserve-3d overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 400 150"
          >
            <path
              className="chart-path-in"
              d="M0,130 C40,110 80,140 120,90 C160,40 200,80 240,60 C280,40 320,10 400,20"
              fill="none"
              stroke="#003820"
              strokeLinecap="round"
              strokeWidth="3"
            />
            <path
              d="M0,130 C40,110 80,140 120,90 C160,40 200,80 240,60 C280,40 320,10 400,20 L400,150 L0,150 Z"
              fill="url(#gradIn)"
              opacity="0.15"
            />
            <path
              className="chart-path-out"
              d="M0,140 C50,135 100,120 150,125 C200,130 250,90 300,110 C350,130 380,80 400,85"
              fill="none"
              stroke="#95d4ac"
              strokeDasharray="4 4"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="gradIn" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#003820" stopOpacity="1" />
                <stop offset="100%" stopColor="#003820" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="flex justify-start gap-6 mt-4 pt-3 border-t border-surface-variant/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-label text-xs text-on-surface-variant">Cash In (₹52,000)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border border-inverse-primary border-dashed" />
            <span className="font-label text-xs text-on-surface-variant">Cash Out (₹9,500)</span>
          </div>
        </div>
      </div>

      {/* Quick Action Floating Panels (4 Cols on Desktop) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
        <button
          onClick={() => setModalState({ isOpen: true, type: 'income' })}
          className="bento-card-interactive p-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">add</span>
            </div>
            <div className="text-left">
              <div className="font-label text-sm font-semibold text-on-surface">Log Income</div>
              <div className="font-label text-xs text-on-surface-variant">Add new sale record</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => setModalState({ isOpen: true, type: 'expense' })}
          className="bento-card-interactive p-4 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined">remove</span>
            </div>
            <div className="text-left">
              <div className="font-label text-sm font-semibold text-on-surface">Log Expense</div>
              <div className="font-label text-xs text-on-surface-variant">Record payment or bill</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={handleGenerateReport}
          className="bento-card p-4 flex items-center justify-between bg-primary-container text-on-primary-container hover:bg-primary transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-on-primary-container/20 flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <div className="text-left">
              <div className="font-label text-sm font-semibold text-on-primary-container">
                {reportGenerated ? 'Report Ready!' : 'Generate Report'}
              </div>
              <div className="font-label text-xs opacity-80">
                {reportGenerated ? 'Downloaded summary PDF' : "This month's summary"}
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* Recent Transactions List */}
        <div className="bento-card p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Recent Logs
            </span>
            <span className="font-label text-xs text-primary font-semibold">
              {recentTransactions.length} items
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {recentTransactions.slice(0, 3).map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center text-xs p-2 rounded-lg bg-surface-container-low"
              >
                <div>
                  <div className="font-semibold text-on-surface">{tx.category}</div>
                  <div className="text-on-surface-variant text-[11px]">{tx.date}</div>
                </div>
                <div
                  className={`font-semibold ${
                    tx.type === 'income' ? 'text-primary' : 'text-error'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Advisory Banner (12 Cols) */}
      <ActionableAdvisory
        title="Weather Warning: Protect Grain Storage"
        description="Unexpected rain is predicted tomorrow afternoon in your region. It is recommended to cover the outdoor grain storage immediately to prevent crop spoilage."
      />

      {/* Live IoT Telemetry Title */}
      <div className="col-span-12 mt-2">
        <h2 className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
          Facility Telemetry (IoT Sensors)
        </h2>
      </div>

      {/* Telemetry Widgets */}
      <div className="col-span-12 md:col-span-6">
        <TelemetryWidget
          title="Cold Storage Temp"
          subtitle="Target: 4.0°C"
          value="4.2°C"
          statusLabel="Stable"
          icon="ac_unit"
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <TelemetryWidget
          title="Milk Chiller Motor"
          subtitle="Vibration Anomaly Detected"
          value="High"
          isAlert={true}
          icon="vibration"
          onInspect={() => {
            if (onNavigateToProfile) onNavigateToProfile();
          }}
        />
      </div>

      {/* Modal for Income/Expense logging */}
      <TransactionModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={() => setModalState({ isOpen: false, type: 'income' })}
        onSubmit={handleTransactionSubmit}
      />
    </div>
  );
};
