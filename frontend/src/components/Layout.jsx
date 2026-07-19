import React from 'react';

/**
 * Layout wrapper handling view state and responsive navigation.
 */
export const Layout = ({ activeView, setActiveView, children }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'hub', label: 'Field Hub', icon: 'view_cozy' },
    { id: 'profile', label: 'Risk Profile', icon: 'shield_person' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Desktop Navigation Top AppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20 hidden md:flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-xs">
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
          <button className="relative p-2 text-on-surface-variant hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/30">
            <img
              className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFZvqEKTFQTvFZtqcbDJ5nh61b4fFoZreiuKwCjlkFlaFF6fqUKnFcl97Zp3mHDWMXRiZ3hU8i8ZyHIILwcsARyTXv7kY6u6lOn1ifeO2yr2wuyKXdGxovcu6DYihoiycySydI3DfU3wSqtdJlfbUILTngAl9gH0Hkg_is6lwT0TKvCI80pDcO04xold-okmg5s984TXHB9cSlmkX2luTOyi80RdLDFfn5JZTgdkYB_flAMIpG1GlmoVdJP_zpc1I8yiOKlwwHmoY"
              alt="User profile"
            />
            <span className="font-label text-xs font-semibold text-on-surface">Ramesh Kumar</span>
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
          <button className="relative p-2 text-on-surface-variant">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </button>
          <img
            className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFZvqEKTFQTvFZtqcbDJ5nh61b4fFoZreiuKwCjlkFlaFF6fqUKnFcl97Zp3mHDWMXRiZ3hU8i8ZyHIILwcsARyTXv7kY6u6lOn1ifeO2yr2wuyKXdGxovcu6DYihoiycySydI3DfU3wSqtdJlfbUILTngAl9gH0Hkg_is6lwT0TKvCI80pDcO04xold-okmg5s984TXHB9cSlmkX2luTOyi80RdLDFfn5JZTgdkYB_flAMIpG1GlmoVdJP_zpc1I8yiOKlwwHmoY"
            alt="User profile"
          />
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
    </div>
  );
};
