import { useState } from 'react';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/projects';
import { CarbonCredits } from './components/cc';
import { Verification } from './components/verification';
import { Reports } from './components/reports';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'credits':
        return <CarbonCredits />;
      case 'verification':
        return <Verification />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Application settings and configuration options will be available here.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header walletAddress={walletAddress} onWalletConnect={setWalletAddress} />
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 min-h-screen">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;