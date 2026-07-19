import React, { useState } from 'react';

/**
 * TransactionModal component for logging Income/Expense with state and submit callback.
 */
export const TransactionModal = ({ isOpen, onClose, type = 'income', onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(type === 'income' ? 'Grain Sale' : 'Feed Purchase');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg('');

    const payload = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    };

    if (onSubmit) {
      await onSubmit(payload);
    }

    setIsSubmitting(false);
    setSuccessMsg(`Transaction successfully recorded!`);
    setTimeout(() => {
      setSuccessMsg('');
      setAmount('');
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-secondary-container relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                type === 'income'
                  ? 'bg-primary text-on-primary'
                  : 'bg-secondary-container text-on-secondary-container'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {type === 'income' ? 'add' : 'remove'}
              </span>
            </span>
            <h3 className="font-headline text-lg font-bold text-primary capitalize">
              Log {type}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:bg-surface-container rounded-full p-1 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {successMsg ? (
          <div className="py-8 text-center text-primary font-semibold font-body bg-primary-fixed/30 rounded-xl">
            <span className="material-symbols-outlined text-3xl mb-1 block">check_circle</span>
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-label text-on-surface-variant mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-label text-on-surface-variant mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl font-body text-on-surface focus:outline-none focus:border-primary"
              >
                {type === 'income' ? (
                  <>
                    <option value="Grain Sale">Grain Sale</option>
                    <option value="Dairy Supply">Dairy Supply</option>
                    <option value="Poultry Sale">Poultry Sale</option>
                    <option value="Govt Subsidy">Govt Subsidy</option>
                    <option value="Other Income">Other Income</option>
                  </>
                ) : (
                  <>
                    <option value="Feed Purchase">Feed Purchase</option>
                    <option value="Equipment Repair">Equipment Repair</option>
                    <option value="Electricity / Fuel">Electricity / Fuel</option>
                    <option value="Labor Wages">Labor Wages</option>
                    <option value="Loan Repayment">Loan Repayment</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-label text-on-surface-variant mb-1">
                Notes / Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional notes..."
                className="w-full px-4 py-2.5 bg-surface-container-low border border-outline-variant/40 rounded-xl font-body text-on-surface focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 mt-2 pt-3 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-label text-on-surface-variant hover:bg-surface-container rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-on-primary font-label text-sm rounded-full hover:bg-surface-tint transition-colors flex items-center gap-1"
              >
                {isSubmitting ? 'Saving...' : 'Submit Transaction'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
