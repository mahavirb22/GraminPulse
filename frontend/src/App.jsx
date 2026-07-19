import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { MicroEnterpriseDashboard } from './views/MicroEnterpriseDashboard';
import { FieldOfficerHub } from './views/FieldOfficerHub';
import { EnterpriseRiskProfile } from './views/EnterpriseRiskProfile';

export function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  const handleSelectEnterprise = (enterprise) => {
    setSelectedEnterprise(enterprise);
    setActiveView('profile');
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {activeView === 'dashboard' && (
        <MicroEnterpriseDashboard
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
