import { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import RouteManagement from './components/RouteManagement';
import ScheduleManagement from './components/ScheduleManagement';
import DriverManagement from './components/DriverManagement';
import VehicleManagement from './components/VehicleManagement';
import FuelMaintenance from './components/FuelMaintenance';
import Reports from './components/Reports';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'routes':
        return <RouteManagement />;
      case 'schedules':
        return <ScheduleManagement />;
      case 'drivers':
        return <DriverManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'maintenance':
        return <FuelMaintenance />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}