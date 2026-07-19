import React, { useState } from 'react';
import { RiskBadge } from '../components/RiskBadge';

const ENTERPRISES_DATA = [
  {
    id: 'GP-8842',
    name: 'Ganga Dairy Coop',
    sector: 'Dairy',
    icon: 'water_drop',
    status: 'stable',
    installment: '₹4,500',
    dueText: '5 Days',
    dueLabel: 'Due in',
  },
  {
    id: 'GP-9910',
    name: 'Kisan Organics',
    sector: 'Agriculture',
    icon: 'agriculture',
    status: 'warning',
    installment: '₹12,000',
    dueText: '2 Days',
    dueLabel: 'Overdue',
  },
  {
    id: 'GP-2144',
    name: 'Sunrise Poultry',
    sector: 'Poultry',
    icon: 'egg',
    status: 'action',
    installment: '₹8,200',
    dueText: 'Pending',
    dueLabel: 'Audit Status',
  },
  {
    id: 'GP-3301',
    name: 'Crafts of Bundelkhand',
    sector: 'Artisan',
    icon: 'handyman',
    status: 'stable',
    installment: '₹3,100',
    dueText: '12 Days',
    dueLabel: 'Due in',
  },
  {
    id: 'GP-8492-AG',
    name: 'Kisan Agro Co.',
    sector: 'Agriculture',
    icon: 'eco',
    status: 'elevated',
    installment: '₹15,400',
    dueText: 'Immediate',
    dueLabel: 'Review Required',
  },
  {
    id: 'GP-5540',
    name: 'Narmada Dairy Works',
    sector: 'Dairy',
    icon: 'water_drop',
    status: 'stable',
    installment: '₹6,800',
    dueText: '8 Days',
    dueLabel: 'Due in',
  },
];

export const FieldOfficerHub = ({ onSelectEnterprise }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const sectors = [
    { name: 'All', icon: 'apps' },
    { name: 'Agriculture', icon: 'agriculture' },
    { name: 'Poultry', icon: 'egg' },
    { name: 'Dairy', icon: 'water_drop' },
    { name: 'Artisan', icon: 'handyman' },
  ];

  // Filtered dataset based on state
  const filteredEnterprises = ENTERPRISES_DATA.filter((item) => {
    const matchesSector =
      selectedSector === 'All' || item.sector.toLowerCase() === selectedSector.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-5 py-4 flex flex-col gap-6">
      {/* Header Section */}
      <section className="flex flex-col gap-1">
        <h1 className="font-headline text-3xl font-bold text-primary">Field Officer Hub</h1>
        <p className="font-body text-base text-on-surface-variant">
          Manage and monitor your regional portfolio of micro-enterprises.
        </p>
      </section>

      {/* Controlled Search & Sector Filter Bar */}
      <section className="flex flex-col gap-3 sticky top-14 z-30 bg-background/95 backdrop-blur-sm py-2 -mx-5 px-5 border-b border-outline-variant/10">
        {/* Controlled Input for Search */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search enterprises by name or ID..."
            className="w-full pl-12 pr-10 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-xl font-body text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-on-surface placeholder:text-outline-variant shadow-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-sm">cancel</span>
            </button>
          )}
        </div>

        {/* Sector Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {sectors.map((sec) => {
            const isActive = selectedSector === sec.name;
            return (
              <button
                key={sec.name}
                onClick={() => setSelectedSector(sec.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-label text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'bg-surface-container-low text-on-surface border border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{sec.icon}</span>
                {sec.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Enterprise List Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {filteredEnterprises.length > 0 ? (
          filteredEnterprises.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEnterprise && onSelectEnterprise(item)}
              className="bento-card-interactive p-4 flex flex-col gap-3 group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined font-fill">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-semibold text-primary leading-tight group-hover:text-surface-tint transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-label text-xs text-on-surface-variant">ID: #{item.id}</p>
                  </div>
                </div>
                <RiskBadge status={item.status} />
              </div>

              <div className="w-full h-[1px] bg-secondary-fixed/50 my-0.5" />

              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col">
                  <span className="font-label text-xs text-on-surface-variant">
                    {item.dueLabel === 'Audit Status' ? 'Audit Status' : 'Outstanding / Due'}
                  </span>
                  <span className="font-body text-sm font-medium text-on-surface">
                    {item.installment}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label text-xs text-on-surface-variant">
                    {item.dueLabel}
                  </span>
                  <span
                    className={`font-body text-sm font-medium ${
                      item.status === 'warning' || item.status === 'action'
                        ? 'text-error'
                        : 'text-on-surface'
                    }`}
                  >
                    {item.dueText}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-on-surface-variant font-body">
            <span className="material-symbols-outlined text-4xl mb-2 text-outline">search_off</span>
            <p>No micro-enterprises match your search and filter criteria.</p>
          </div>
        )}
      </section>
    </div>
  );
};
