import React, { useState } from 'react';
import { ActionableAdvisory } from '../components/ActionableAdvisory';
import { TelemetryWidget } from '../components/TelemetryWidget';
import { TransactionModal } from '../components/TransactionModal';

export const MicroEnterpriseDashboard = ({ onNavigateToProfile, user, transactions = [], onAddTransaction }) => {
  const [modalState, setModalState] = useState({ isOpen: false, type: 'income' });
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  const farmerName = user?.name || 'Ramesh Kumar';

  /**
   * Handle transaction submission from modal.
   */
  const handleTransactionSubmit = async (transactionData) => {
    if (onAddTransaction) {
      onAddTransaction(transactionData);
    }
  };

  /**
   * Generate & download actual summary file.
   */
  const handleGenerateReport = () => {
    const reportText = `================================================
GRAMINPULSE RURAL FINTECH UI - MONTHLY SUMMARY REPORT
================================================
Generated for: ${farmerName}
Date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Enterprise: Ganga Dairy Coop (ID: #GP-8842)
Location: Varanasi, UP
------------------------------------------------
FINANCIAL OVERVIEW:
- Total Cash In:  ₹52,000 (+12% vs last month)
- Total Cash Out: ₹9,500
- Net Surplus:    ₹42,500
- Status:         Stable

IOT TELEMETRY DIAGNOSTICS:
- Cold Storage Temp:  4.2°C (Target: 4.0°C - STABLE)
- Milk Chiller Motor: Vibration Anomaly Detected (HIGH ALERT)

AI ADVISORY SUMMARY:
- Unexpected rain is predicted tomorrow afternoon. Cover outdoor grain storage immediately to prevent spoilage.
- Inspect chiller motor vibration and prepare NABARD liquidity buffer.

================================================
Report powered by GraminPulse Explainable AI (XAI)
================================================
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GraminPulse_Monthly_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setReportGenerated(true);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  /**
   * Export CSV option in bento menu
   */
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Category,Type,Amount\nToday,Milk Supply,Income,42500\nYesterday,Cattle Feed,Expense,3200\n15 Jul,Govt Subsidy,Income,12000\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CashFlow_Data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  return (
    <div className="px-5 py-4 max-w-7xl mx-auto flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-6">
      {/* Welcome Header */}
      <div className="col-span-12 mb-2 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h1 className="font-headline text-3xl font-bold text-primary">Overview</h1>
          <p className="font-body text-base text-on-surface-variant">
            Welcome back, <span className="font-semibold text-primary">{farmerName}</span>. Here's your enterprise summary.
          </p>
        </div>
        <div className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-label font-semibold border border-primary-fixed-dim">
          Ganga Dairy Coop (#GP-8842)
        </div>
      </div>

      {/* Cash Flow Bento Card (8 Cols on Desktop) */}
      <div className="bento-card col-span-12 lg:col-span-8 p-6 flex flex-col relative overflow-visible">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1 font-semibold">
              Cash Flow ({timeframe})
            </h2>
            <div className="font-headline text-3xl font-bold text-on-surface flex items-baseline gap-2">
              ₹42,500{' '}
              <span className="font-label text-xs font-semibold text-secondary-fixed bg-primary px-2.5 py-0.5 rounded-full">
                +12% vs last month
              </span>
            </div>
          </div>

          {/* Three Dots Interactive Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary p-1.5 bg-surface-container-low rounded-full hover:bg-surface-container transition-colors active:scale-95"
              title="Timeframe Options"
            >
              <span className="material-symbols-outlined">more_horiz</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-10 z-40 bg-white border border-outline-variant/30 rounded-xl shadow-xl p-2 w-48 font-label text-xs animate-fadeIn">
                <button
                  onClick={() => {
                    setTimeframe('Last 30 Days');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low flex items-center justify-between ${
                    timeframe === 'Last 30 Days' ? 'font-bold text-primary bg-primary-fixed/20' : 'text-on-surface'
                  }`}
                >
                  Last 30 Days
                  {timeframe === 'Last 30 Days' && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
                <button
                  onClick={() => {
                    setTimeframe('Last 90 Days');
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low flex items-center justify-between ${
                    timeframe === 'Last 90 Days' ? 'font-bold text-primary bg-primary-fixed/20' : 'text-on-surface'
                  }`}
                >
                  Last 90 Days
                  {timeframe === 'Last 90 Days' && <span className="material-symbols-outlined text-sm">check</span>}
                </button>
                <div className="w-full h-[1px] bg-outline-variant/20 my-1" />
                <button
                  onClick={handleExportCSV}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface-container-low text-primary font-semibold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export CSV File
                </button>
              </div>
            )}
          </div>
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

        {/* Generate & Download Report Button */}
        <button
          onClick={handleGenerateReport}
          className="bento-card p-4 flex items-center justify-between bg-primary-container text-on-primary-container hover:bg-primary transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-on-primary-container/20 flex items-center justify-center text-primary-fixed">
              <span className="material-symbols-outlined">
                {reportGenerated ? 'download_done' : 'receipt_long'}
              </span>
            </div>
            <div className="text-left">
              <div className="font-label text-sm font-semibold text-on-primary-container">
                {reportGenerated ? 'Report Downloaded!' : 'Generate Report'}
              </div>
              <div className="font-label text-xs opacity-80">
                {reportGenerated ? 'Saved Summary .txt File' : "Download this month's summary"}
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            download
          </span>
        </button>

        {/* Recent Transactions List */}
        <div className="bento-card p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              Recent Logs
            </span>
            <span className="font-label text-xs text-primary font-semibold">
              {transactions.length} items
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {transactions.slice(0, 3).map((tx) => (
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
