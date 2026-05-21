import {
  LayoutDashboard,
  Route,
  Calendar,
  Users,
  Bus,
  Fuel,
  FileText,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'routes', label: 'Route Management', icon: Route },
    { id: 'schedules', label: 'Schedules', icon: Calendar },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'vehicles', label: 'Vehicles', icon: Bus },
    { id: 'maintenance', label: 'Fuel & Maintenance', icon: Fuel },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-indigo-800">
        <div className="flex items-center">
          <Bus className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-xl">SRMSS</h1>
            <p className="text-xs text-indigo-300">Depot Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-200 hover:bg-indigo-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-indigo-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
