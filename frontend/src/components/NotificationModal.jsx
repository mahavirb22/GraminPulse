import React, { useState } from 'react';

export const NotificationModal = ({ isOpen, onClose, transactions = [] }) => {
  const [filterType, setFilterType] = useState('all'); // all | income | expense

  if (!isOpen) return null;

  // Default sample history if transactions list is empty
  const defaultHistory = [
    { id: 101, type: 'income', amount: 42500, category: 'Milk Supply Sale', date: 'Today, 09:30 AM', note: 'Bulk supply to regional cooperative' },
    { id: 102, type: 'expense', amount: 3200, category: 'Organic Cattle Feed', date: 'Yesterday, 04:15 PM', note: '2 bags organic fodder' },
    { id: 103, type: 'income', amount: 12000, category: 'Govt Milk Subsidy', date: '15 Jul 2026', note: 'Direct benefit transfer' },
    { id: 104, type: 'expense', amount: 4500, category: 'Chiller Motor Repair', date: '12 Jul 2026', note: 'Maintenance service payment' },
    { id: 105, type: 'income', amount: 15400, category: 'Wholesale Milk Batch', date: '10 Jul 2026', note: 'Cooperative batch payout' },
    { id: 106, type: 'expense', amount: 2800, category: 'Electricity & Utility', date: '05 Jul 2026', note: 'Monthly facility bill' },
  ];

  const historyList = transactions.length > 0 ? transactions : defaultHistory;

  const totalIncome = historyList
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  const totalExpense = historyList
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  const filteredItems = historyList.filter((item) => {
    if (filterType === 'income') return item.type === 'income';
    if (filterType === 'expense') return item.type === 'expense';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-secondary-container relative animate-fadeIn flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-lg">notifications</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-primary">
                Activity & Transaction History
              </h3>
              <p className="font-label text-xs text-on-surface-variant">
                Log of all money added and decreased
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Cash In vs Cash Out Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-primary-fixed/30 border border-primary-fixed-dim/50 p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-primary mb-0.5">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              <span className="font-label text-xs font-semibold uppercase">Total Money Added</span>
            </div>
            <div className="font-headline text-xl font-bold text-primary">
              +₹{totalIncome.toLocaleString()}
            </div>
          </div>

          <div className="bg-error-container/20 border border-error/20 p-3 rounded-xl">
            <div className="flex items-center gap-1.5 text-error mb-0.5">
              <span className="material-symbols-outlined text-sm">arrow_downward</span>
              <span className="font-label text-xs font-semibold uppercase">Total Decreased</span>
            </div>
            <div className="font-headline text-xl font-bold text-error">
              -₹{totalExpense.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-3 border-b border-outline-variant/20 pb-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filterType === 'all'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            All Activity ({historyList.length})
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filterType === 'income'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Money Added (+)
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-3 py-1 rounded-full font-label text-xs font-semibold ${
              filterType === 'expense'
                ? 'bg-error text-on-error'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            Money Decreased (-)
          </button>
        </div>

        {/* History Item List */}
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2.5 pr-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex justify-between items-center hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    item.type === 'income'
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-error-container text-on-error-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {item.type === 'income' ? 'add' : 'remove'}
                  </span>
                </div>
                <div>
                  <div className="font-label text-sm font-semibold text-on-surface">
                    {item.category}
                  </div>
                  <div className="font-body text-xs text-on-surface-variant">
                    {item.date} {item.note ? `• ${item.note}` : ''}
                  </div>
                </div>
              </div>
              <div
                className={`font-headline text-base font-bold ${
                  item.type === 'income' ? 'text-primary' : 'text-error'
                }`}
              >
                {item.type === 'income' ? '+' : '-'}₹{item.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-label text-xs font-semibold rounded-full hover:bg-surface-tint"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
