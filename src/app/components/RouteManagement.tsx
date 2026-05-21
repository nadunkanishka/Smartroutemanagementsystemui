import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Search } from 'lucide-react';

interface RouteData {
  id: number;
  name: string;
  start: string;
  end: string;
  distance: string;
  stops: number;
  assignedBus: string;
  assignedDriver: string;
}

export default function RouteManagement() {
  const [routes, setRoutes] = useState<RouteData[]>([
    { id: 1, name: 'Route 001', start: 'Colombo Fort', end: 'Kandy', distance: '115 km', stops: 12, assignedBus: 'NA-1234', assignedDriver: 'K. Silva' },
    { id: 2, name: 'Route 002', start: 'Galle', end: 'Matara', distance: '42 km', stops: 8, assignedBus: 'WP-5678', assignedDriver: 'R. Fernando' },
    { id: 3, name: 'Route 003', start: 'Negombo', end: 'Colombo', distance: '38 km', stops: 6, assignedBus: 'WP-9012', assignedDriver: 'S. Perera' },
    { id: 4, name: 'Route 004', start: 'Anuradhapura', end: 'Jaffna', distance: '140 km', stops: 15, assignedBus: 'NC-3456', assignedDriver: 'M. Kumar' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    start: '',
    end: '',
    distance: '',
    stops: '',
    assignedBus: '',
    assignedDriver: ''
  });

  const handleAddRoute = () => {
    if (formData.name && formData.start && formData.end) {
      const newRoute: RouteData = {
        id: routes.length + 1,
        name: formData.name,
        start: formData.start,
        end: formData.end,
        distance: formData.distance,
        stops: parseInt(formData.stops) || 0,
        assignedBus: formData.assignedBus,
        assignedDriver: formData.assignedDriver
      };
      setRoutes([...routes, newRoute]);
      setShowModal(false);
      setFormData({ name: '', start: '', end: '', distance: '', stops: '', assignedBus: '', assignedDriver: '' });
    }
  };

  const handleDeleteRoute = (id: number) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.start.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.end.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Route Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Route
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-4 text-gray-700">Route Name</th>
                <th className="text-left py-4 px-4 text-gray-700">Start Point</th>
                <th className="text-left py-4 px-4 text-gray-700">End Point</th>
                <th className="text-left py-4 px-4 text-gray-700">Distance</th>
                <th className="text-left py-4 px-4 text-gray-700">Stops</th>
                <th className="text-left py-4 px-4 text-gray-700">Assigned Bus</th>
                <th className="text-left py-4 px-4 text-gray-700">Assigned Driver</th>
                <th className="text-left py-4 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800">{route.name}</td>
                  <td className="py-4 px-4 text-gray-700">{route.start}</td>
                  <td className="py-4 px-4 text-gray-700">{route.end}</td>
                  <td className="py-4 px-4 text-gray-700">{route.distance}</td>
                  <td className="py-4 px-4 text-gray-700">{route.stops}</td>
                  <td className="py-4 px-4 text-gray-700">{route.assignedBus}</td>
                  <td className="py-4 px-4 text-gray-700">{route.assignedDriver}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Route Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl mb-4 text-gray-800">Add New Route</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Route Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Route 005"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Distance</label>
                <input
                  type="text"
                  value={formData.distance}
                  onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 50 km"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Start Point</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.start}
                    onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., Colombo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">End Point</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.end}
                    onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., Kandy"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Number of Stops</label>
                <input
                  type="number"
                  value={formData.stops}
                  onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Assigned Bus</label>
                <input
                  type="text"
                  value={formData.assignedBus}
                  onChange={(e) => setFormData({ ...formData, assignedBus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., NA-1234"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-700">Assigned Driver</label>
              <input
                type="text"
                value={formData.assignedDriver}
                onChange={(e) => setFormData({ ...formData, assignedDriver: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g., K. Silva"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoute}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
