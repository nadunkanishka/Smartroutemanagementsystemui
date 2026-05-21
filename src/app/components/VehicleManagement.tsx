import { useState } from 'react';
import { Plus, Edit, Trash2, Bus, Wrench, Calendar } from 'lucide-react';

interface VehicleData {
  id: number;
  registrationNumber: string;
  model: string;
  capacity: number;
  mileage: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: string;
  condition: string;
}

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([
    { id: 1, registrationNumber: 'NA-1234', model: 'Ashok Leyland Viking', capacity: 52, mileage: '125,430 km', lastMaintenance: '2026-04-15', nextMaintenance: '2026-07-15', status: 'Active', condition: 'Good' },
    { id: 2, registrationNumber: 'WP-5678', model: 'TATA LP 1613', capacity: 48, mileage: '98,250 km', lastMaintenance: '2026-05-10', nextMaintenance: '2026-08-10', status: 'Active', condition: 'Excellent' },
    { id: 3, registrationNumber: 'WP-9012', model: 'Eicher Skyline Pro', capacity: 40, mileage: '156,890 km', lastMaintenance: '2026-03-20', nextMaintenance: '2026-06-20', status: 'Maintenance', condition: 'Fair' },
    { id: 4, registrationNumber: 'NC-3456', model: 'Ashok Leyland Viking', capacity: 52, mileage: '87,340 km', lastMaintenance: '2026-05-05', nextMaintenance: '2026-08-05', status: 'Active', condition: 'Good' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    capacity: '',
    mileage: '',
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const handleAddVehicle = () => {
    if (formData.registrationNumber && formData.model && formData.capacity) {
      const newVehicle: VehicleData = {
        id: vehicles.length + 1,
        registrationNumber: formData.registrationNumber,
        model: formData.model,
        capacity: parseInt(formData.capacity),
        mileage: formData.mileage,
        lastMaintenance: formData.lastMaintenance,
        nextMaintenance: formData.nextMaintenance,
        status: 'Active',
        condition: 'Good'
      };
      setVehicles([...vehicles, newVehicle]);
      setShowModal(false);
      setFormData({ registrationNumber: '', model: '', capacity: '', mileage: '', lastMaintenance: '', nextMaintenance: '' });
    }
  };

  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Vehicle Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Vehicle
        </button>
      </div>

      {/* Vehicle Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Vehicles</h3>
          <p className="text-3xl text-gray-800">{vehicles.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Active</h3>
          <p className="text-3xl text-green-600">{vehicles.filter(v => v.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">In Maintenance</h3>
          <p className="text-3xl text-orange-600">{vehicles.filter(v => v.status === 'Maintenance').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Capacity</h3>
          <p className="text-3xl text-blue-600">{vehicles.reduce((sum, v) => sum + v.capacity, 0)}</p>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-4 text-gray-700">Registration</th>
                <th className="text-left py-4 px-4 text-gray-700">Model</th>
                <th className="text-left py-4 px-4 text-gray-700">Capacity</th>
                <th className="text-left py-4 px-4 text-gray-700">Mileage</th>
                <th className="text-left py-4 px-4 text-gray-700">Last Maintenance</th>
                <th className="text-left py-4 px-4 text-gray-700">Next Maintenance</th>
                <th className="text-left py-4 px-4 text-gray-700">Condition</th>
                <th className="text-left py-4 px-4 text-gray-700">Status</th>
                <th className="text-left py-4 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <Bus className="w-5 h-5 text-indigo-600 mr-2" />
                      <span className="text-gray-800">{vehicle.registrationNumber}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{vehicle.model}</td>
                  <td className="py-4 px-4 text-gray-700">{vehicle.capacity} seats</td>
                  <td className="py-4 px-4 text-gray-700">{vehicle.mileage}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                      {vehicle.lastMaintenance}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-gray-700">
                      <Wrench className="w-4 h-4 text-gray-500 mr-2" />
                      {vehicle.nextMaintenance}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      vehicle.condition === 'Excellent' ? 'bg-green-100 text-green-700' :
                      vehicle.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {vehicle.condition}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      vehicle.status === 'Active' ? 'bg-green-100 text-green-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
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

      {/* Add Vehicle Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-800">Add New Vehicle</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., NA-1234"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Model</label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Ashok Leyland Viking"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Seating Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 52"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Current Mileage</label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 125,430 km"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Last Maintenance Date</label>
                <input
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Next Maintenance Date</label>
                <input
                  type="date"
                  value={formData.nextMaintenance}
                  onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVehicle}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
