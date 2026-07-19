import React, { useState } from 'react';
import { NotificationModal } from './NotificationModal';

export const COMMON_FARMER_AVATAR =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80';

/**
 * Layout wrapper handling view state, common user profile, notification history modal, and logout.
 */
export const Layout = ({
  activeView,
  setActiveView,
  user,
  onLogout,
  transactions = [],
  children,
}) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'hub', label: 'Field Hub', icon: 'view_cozy' },
    { id: 'profile', label: 'Risk Profile', icon: 'shield_person' },
  ];

  const userName = user?.name || 'Ramesh Kumar';

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Desktop Navigation Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20 hidden md:flex items-center justify-between px-6 h-16">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveView('dashboard')}
        >
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-xs shadow-sm">
            GP
          </div>
          <span className="font-headline text-xl font-bold text-primary tracking-tight">
            GraminPulse
          </span>
        </div>

        {/* View switcher nav tabs */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-label text-sm transition-all ${
                activeView === item.id
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-primary-container/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 text-on-surface-variant hover:bg-primary-container/10 rounded-full transition-colors active:scale-95"
            title="View Activity & Transaction History"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/30">
            <img
              className="w-8 h-8 rounded-full object-cover border border-outline-variant/40 shadow-sm"
              src={COMMON_FARMER_AVATAR}
              alt="Farmer profile"
            />
            <span className="font-label text-xs font-semibold text-on-surface">{userName}</span>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-xs font-label text-error hover:bg-error-container/20 px-2 py-1 rounded-md transition-colors flex items-center gap-1 ml-1"
                title="Sign Out"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Top AppBar */}
      <div className="md:hidden flex items-center justify-between px-4 pt-4 pb-3 bg-surface sticky top-0 z-40 shadow-sm border-b border-outline-variant/20">
        <div className="flex items-center gap-2" onClick={() => setActiveView('dashboard')}>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-xs">
            GP
          </div>
          <span className="font-headline text-lg font-bold text-primary tracking-tight">
            GraminPulse
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 text-on-surface-variant"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <img
            className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
            src={COMMON_FARMER_AVATAR}
            alt="Farmer profile"
          />
          {onLogout && (
            <button onClick={onLogout} className="p-1 text-error" title="Sign Out">
              <span className="material-symbols-outlined text-sm">logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-8 md:pt-20">{children}</main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-md border-t border-outline-variant/20 shadow-lg flex justify-around items-center h-16 px-2 md:hidden">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-semibold scale-105'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="font-label text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Notification & Activity History Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        transactions={transactions}
      />
    </div>
  );
};
