import { Bus, Route, Users, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Routes', value: '45', icon: Route, color: 'bg-blue-500' },
    { label: 'Active Buses', value: '128', icon: Bus, color: 'bg-green-500' },
    { label: 'Total Drivers', value: '156', icon: Users, color: 'bg-purple-500' },
    { label: 'Today\'s Trips', value: '342', icon: Calendar, color: 'bg-orange-500' },
  ];

  const recentTrips = [
    { route: 'Colombo - Kandy', bus: 'NA-1234', driver: 'K. Silva', status: 'On Time', time: '08:30 AM' },
    { route: 'Galle - Matara', bus: 'WP-5678', driver: 'R. Fernando', status: 'Delayed', time: '09:15 AM' },
    { route: 'Negombo - Colombo', bus: 'WP-9012', driver: 'S. Perera', status: 'Completed', time: '10:00 AM' },
    { route: 'Anuradhapura - Jaffna', bus: 'NC-3456', driver: 'M. Kumar', status: 'On Time', time: '07:45 AM' },
  ];

  const alerts = [
    { message: 'Bus NA-4567 requires maintenance', type: 'warning' },
    { message: 'Driver license expiring soon for P. Mendis', type: 'info' },
    { message: 'High fuel consumption detected on Route 12', type: 'warning' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl mb-6 text-gray-800">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm">{stat.label}</h3>
              <p className="text-3xl text-gray-800 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Trips */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Recent Trips</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-gray-600 text-sm">Route</th>
                  <th className="text-left py-3 px-2 text-gray-600 text-sm">Bus</th>
                  <th className="text-left py-3 px-2 text-gray-600 text-sm">Driver</th>
                  <th className="text-left py-3 px-2 text-gray-600 text-sm">Time</th>
                  <th className="text-left py-3 px-2 text-gray-600 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((trip, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm text-gray-800">{trip.route}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{trip.bus}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{trip.driver}</td>
                    <td className="py-3 px-2 text-sm text-gray-700">{trip.time}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        trip.status === 'On Time' ? 'bg-green-100 text-green-700' :
                        trip.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {trip.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Alerts & Notifications</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg flex items-start ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <AlertCircle className={`w-5 h-5 mr-2 mt-0.5 ${
                  alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                }`} />
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
