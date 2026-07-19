import React, { useState } from 'react';

export const HistoryModal = ({ isOpen, onClose, enterpriseName = 'Kisan Agro Co.' }) => {
  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const fullHistoryEvents = [
    { id: 1, title: 'Missed Payment', date: '2 days ago', detail: 'Invoice #882 ($12,400) overdue by 48 hours', type: 'alert', icon: 'priority_high' },
    { id: 2, title: 'Drought Advisory Issued', date: '5 days ago', detail: 'Regional warning for District 4 - low rainfall forecasted', type: 'warning', icon: 'water_drop' },
    { id: 3, title: 'Inventory Drop Alert', date: '12 days ago', detail: '15% WoW stock decrease detected in cold storage unit #2', type: 'warning', icon: 'inventory_2' },
    { id: 4, title: 'Field Officer Inspection', date: '18 days ago', detail: 'Field Officer Ramesh Kumar performed physical audit. Status: Passed', type: 'audit', icon: 'verified' },
    { id: 5, title: 'Chiller Motor Vibration Spike', date: '25 days ago', detail: 'Vibration metric spiked to 0.9g. Maintenance team dispatched', type: 'alert', icon: 'vibration' },
    { id: 6, title: 'Loan Repayment Installment Paid', date: '30 days ago', detail: '₹15,400 successfully cleared via NABARD direct portal', type: 'audit', icon: 'payments' },
    { id: 7, title: 'High Temperature Telemetry Warning', date: '42 days ago', detail: 'Storage temp reached 14.8°C for 2 hours during grid power outage', type: 'alert', icon: 'thermostat' },
    { id: 8, title: 'Quarterly Risk Review Completed', date: '60 days ago', detail: 'Overall Risk Level transitioned from Stable to Warning', type: 'audit', icon: 'shield' },
  ];

  const filteredEvents = fullHistoryEvents.filter((item) => {
    if (filter === 'alerts') return item.type === 'alert';
    if (filter === 'audits') return item.type === 'audit' || item.type === 'warning';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-secondary-container relative animate-fadeIn flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
          <div>
            <h3 className="font-headline text-lg font-bold text-primary">
              Full Risk & Audit History
            </h3>
            <p className="font-label text-xs text-on-surface-variant">
              Chronological log for {enterpriseName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filter === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            All Events ({fullHistoryEvents.length})
          </button>
          <button
            onClick={() => setFilter('alerts')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filter === 'alerts'
                ? 'bg-error text-on-error'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Critical Alerts
          </button>
          <button
            onClick={() => setFilter('audits')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filter === 'audits'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Audits & Warnings
          </button>
        </div>

        {/* Full History Timeline */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 relative pr-1">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/30" />

          {filteredEvents.map((event) => (
            <div key={event.id} className="flex gap-3 relative z-10 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/20">
              <div
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shrink-0 mt-0.5 ${
                  event.type === 'alert'
                    ? 'bg-error-container text-error'
                    : event.type === 'warning'
                    ? 'bg-tertiary-fixed text-tertiary'
                    : 'bg-primary-fixed text-on-primary-fixed'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{event.icon}</span>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-label text-sm font-semibold text-on-surface">
                    {event.title}
                  </span>
                  <span className="font-label text-[11px] text-on-surface-variant">
                    {event.date}
                  </span>
                </div>
                <p className="font-body text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  {event.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-between items-center">
          <span className="font-label text-xs text-on-surface-variant">
            Showing {filteredEvents.length} history records
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-label text-xs font-semibold rounded-full hover:bg-surface-tint"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
