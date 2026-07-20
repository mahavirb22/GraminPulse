import React, { useState, useEffect } from 'react';
import { AuthScreen } from './views/AuthScreen';
import { Layout } from './components/Layout';
import { MicroEnterpriseDashboard } from './views/MicroEnterpriseDashboard';
import { FieldOfficerHub } from './views/FieldOfficerHub';
import { EnterpriseRiskProfile } from './views/EnterpriseRiskProfile';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEnterprise, setUserEnterprise] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('graminpulse_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
        fetchUserData(parsed.id);
      } catch (e) {
        localStorage.removeItem('graminpulse_user');
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:5000/api/enterprises/user/${userId}`);
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        if (data.data.enterprise) {
          setUserEnterprise(data.data.enterprise);
        }
        if (Array.isArray(data.data.transactions)) {
          const formatted = data.data.transactions.map((tx) => ({
            id: tx._id || tx.id,
            type: (tx.type || 'income').toLowerCase(),
            amount: tx.amount,
            category: tx.category,
            date: new Date(tx.timestamp || tx.createdAt).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
            }),
            note: tx.description || '',
          }));
          setTransactions(formatted);
        }
      }
    } catch (err) {
      console.warn('[DB Fetch Warning] Failed to fetch user enterprise & transactions from API:', err);
    }
  };

  const handleLoginSuccess = (loginResponse) => {
    // Check if loginResponse is the raw server response object { user, enterprise, isNewUser } or just user object
    const userPayload = loginResponse.user || loginResponse;
    const isNew = loginResponse.isNewUser || false;

    setCurrentUser(userPayload);
    setIsAuthenticated(true);
    localStorage.setItem('graminpulse_user', JSON.stringify(userPayload));

    if (loginResponse.enterprise) {
      setUserEnterprise(loginResponse.enterprise);
    }

    if (isNew) {
      // Newly registered users start completely clean with 0 transactions!
      setTransactions([]);
    } else if (userPayload.id) {
      fetchUserData(userPayload.id);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserEnterprise(null);
    setTransactions([]);
    localStorage.removeItem('graminpulse_user');
  };

  const handleAddTransaction = async (newTx) => {
    const formatted = {
      id: Date.now(),
      type: newTx.type,
      amount: newTx.amount,
      category: newTx.category,
      date: 'Just now',
      note: newTx.description || '',
    };

    setTransactions((prev) => [formatted, ...prev]);

    // Send POST request to persist transaction in MongoDB backend
    try {
      await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enterpriseId: userEnterprise?._id,
          type: newTx.type === 'income' ? 'Income' : 'Expense',
          amount: newTx.amount,
          category: newTx.category,
          description: newTx.description || '',
        }),
      });
    } catch (err) {
      console.warn('[Transaction Post Warning] Saved locally (backend offline):', err);
    }
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
          enterprise={userEnterprise}
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onNavigateToProfile={() => {
            setSelectedEnterprise(
              userEnterprise || {
                id: 'GP-8492-AG',
                name: 'Kisan Agro Co.',
                sector: 'Agriculture',
                status: 'elevated',
              }
            );
            setActiveView('profile');
          }}
        />
      )}

      {activeView === 'hub' && (
        <FieldOfficerHub onSelectEnterprise={handleSelectEnterprise} />
      )}

      {activeView === 'profile' && (
        <EnterpriseRiskProfile
          enterprise={selectedEnterprise || userEnterprise}
          onBack={() => setActiveView('hub')}
        />
      )}
    </Layout>
  );
}

export default App;
