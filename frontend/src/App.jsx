import React, { useState, useEffect } from 'react';
import { AuthScreen } from './views/AuthScreen';
import { Layout } from './components/Layout';
import { MicroEnterpriseDashboard } from './views/MicroEnterpriseDashboard';
import { FieldOfficerHub } from './views/FieldOfficerHub';
import { EnterpriseRiskProfile } from './views/EnterpriseRiskProfile';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  // Initial state for transactions log
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', amount: 42500, category: 'Milk Supply Sale', date: 'Today, 09:30 AM', note: 'Bulk supply to cooperative' },
    { id: 2, type: 'expense', amount: 3200, category: 'Cattle Feed', date: 'Yesterday, 04:15 PM', note: 'Organic fodder' },
    { id: 3, type: 'income', amount: 12000, category: 'Govt Subsidy', date: '15 Jul 2026', note: 'Direct benefit transfer' },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('graminpulse_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('graminpulse_user');
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('graminpulse_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('graminpulse_user');
  };

  const handleAddTransaction = (newTx) => {
    const formatted = {
      id: Date.now(),
      type: newTx.type,
      amount: newTx.amount,
      category: newTx.category,
      date: 'Just now',
      note: newTx.description || '',
    };
    setTransactions((prev) => [formatted, ...prev]);
  };

  const handleSelectEnterprise = (enterprise) => {
    setSelectedEnterprise(enterprise);
    setActiveView('profile');
  };

  // If user is not authenticated, render AuthScreen
  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout
      activeView={activeView}
      setActiveView={setActiveView}
      user={currentUser}
      onLogout={handleLogout}
      transactions={transactions}
    >
      {activeView === 'dashboard' && (
        <MicroEnterpriseDashboard
          user={currentUser}
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onNavigateToProfile={() => {
            setSelectedEnterprise({
              id: 'GP-8492-AG',
              name: 'Kisan Agro Co.',
              sector: 'Agriculture',
              status: 'elevated',
            });
            setActiveView('profile');
          }}
        />
      )}

      {activeView === 'hub' && (
        <FieldOfficerHub onSelectEnterprise={handleSelectEnterprise} />
      )}

      {activeView === 'profile' && (
        <EnterpriseRiskProfile
          enterprise={selectedEnterprise}
          onBack={() => setActiveView('hub')}
        />
      )}
    </Layout>
  );
}

export default App;
