import { useState } from 'react';
import { Plus, Fuel, Wrench, TrendingUp } from 'lucide-react';

interface FuelRecord {
  id: number;
  vehicleNumber: string;
  date: string;
  liters: number;
  cost: number;
  odometer: string;
}

interface MaintenanceRecord {
  id: number;
  vehicleNumber: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  nextService: string;
}

export default function FuelMaintenance() {
  const [activeTab, setActiveTab] = useState<'fuel' | 'maintenance'>('fuel');

  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([
    { id: 1, vehicleNumber: 'NA-1234', date: '2026-05-18', liters: 85, cost: 12750, odometer: '125,430 km' },
    { id: 2, vehicleNumber: 'WP-5678', date: '2026-05-19', liters: 72, cost: 10800, odometer: '98,250 km' },
    { id: 3, vehicleNumber: 'NC-3456', date: '2026-05-20', liters: 90, cost: 13500, odometer: '87,340 km' },
  ]);

  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([
    { id: 1, vehicleNumber: 'NA-1234', date: '2026-04-15', type: 'Routine Service', description: 'Oil change, filter replacement', cost: 8500, nextService: '2026-07-15' },
    { id: 2, vehicleNumber: 'WP-9012', date: '2026-03-20', type: 'Repair', description: 'Brake pad replacement', cost: 15000, nextService: '2026-06-20' },
    { id: 3, vehicleNumber: 'WP-5678', date: '2026-05-10', type: 'Routine Service', description: 'Full service and inspection', cost: 12000, nextService: '2026-08-10' },
  ]);

  const [showFuelModal, setShowFuelModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  const [fuelFormData, setFuelFormData] = useState({
    vehicleNumber: '',
    date: '',
    liters: '',
    cost: '',
    odometer: ''
  });

  const [maintenanceFormData, setMaintenanceFormData] = useState({
    vehicleNumber: '',
    date: '',
    type: 'Routine Service',
    description: '',
    cost: '',
    nextService: ''
  });

  const handleAddFuelRecord = () => {
    if (fuelFormData.vehicleNumber && fuelFormData.liters && fuelFormData.cost) {
      const newRecord: FuelRecord = {
        id: fuelRecords.length + 1,
        vehicleNumber: fuelFormData.vehicleNumber,
        date: fuelFormData.date,
        liters: parseFloat(fuelFormData.liters),
        cost: parseFloat(fuelFormData.cost),
        odometer: fuelFormData.odometer
      };
      setFuelRecords([...fuelRecords, newRecord]);
      setShowFuelModal(false);
      setFuelFormData({ vehicleNumber: '', date: '', liters: '', cost: '', odometer: '' });
    }
  };

  const handleAddMaintenanceRecord = () => {
    if (maintenanceFormData.vehicleNumber && maintenanceFormData.description) {
      const newRecord: MaintenanceRecord = {
        id: maintenanceRecords.length + 1,
        vehicleNumber: maintenanceFormData.vehicleNumber,
        date: maintenanceFormData.date,
        type: maintenanceFormData.type,
        description: maintenanceFormData.description,
        cost: parseFloat(maintenanceFormData.cost),
        nextService: maintenanceFormData.nextService
      };
      setMaintenanceRecords([...maintenanceRecords, newRecord]);
      setShowMaintenanceModal(false);
      setMaintenanceFormData({ vehicleNumber: '', date: '', type: 'Routine Service', description: '', cost: '', nextService: '' });
    }
  };

  const totalFuelCost = fuelRecords.reduce((sum, record) => sum + record.cost, 0);
  const totalMaintenanceCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Fuel & Maintenance Management</h1>
        <button
          onClick={() => activeTab === 'fuel' ? setShowFuelModal(true) : setShowMaintenanceModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          {activeTab === 'fuel' ? 'Add Fuel Record' : 'Add Maintenance Record'}
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Total Fuel Cost (This Month)</h3>
            <Fuel className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl text-gray-800">LKR {totalFuelCost.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Total Maintenance Cost</h3>
            <Wrench className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl text-gray-800">LKR {totalMaintenanceCost.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Average Fuel per Vehicle</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl text-gray-800">{(fuelRecords.reduce((sum, r) => sum + r.liters, 0) / fuelRecords.length).toFixed(1)}L</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('fuel')}
            className={`flex-1 px-6 py-4 text-center ${
              activeTab === 'fuel'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Fuel className="w-5 h-5 inline mr-2" />
            Fuel Records
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`flex-1 px-6 py-4 text-center ${
              activeTab === 'maintenance'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Wrench className="w-5 h-5 inline mr-2" />
            Maintenance Records
          </button>
        </div>
      </div>

      {/* Fuel Records Table */}
      {activeTab === 'fuel' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-4 px-4 text-gray-700">Vehicle</th>
                  <th className="text-left py-4 px-4 text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 text-gray-700">Liters</th>
                  <th className="text-left py-4 px-4 text-gray-700">Cost (LKR)</th>
                  <th className="text-left py-4 px-4 text-gray-700">Odometer</th>
                </tr>
              </thead>
              <tbody>
                {fuelRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800">{record.vehicleNumber}</td>
                    <td className="py-4 px-4 text-gray-700">{record.date}</td>
                    <td className="py-4 px-4 text-gray-700">{record.liters}L</td>
                    <td className="py-4 px-4 text-gray-700">{record.cost.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">{record.odometer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Maintenance Records Table */}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-4 px-4 text-gray-700">Vehicle</th>
                  <th className="text-left py-4 px-4 text-gray-700">Date</th>
                  <th className="text-left py-4 px-4 text-gray-700">Type</th>
                  <th className="text-left py-4 px-4 text-gray-700">Description</th>
                  <th className="text-left py-4 px-4 text-gray-700">Cost (LKR)</th>
                  <th className="text-left py-4 px-4 text-gray-700">Next Service</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4 text-gray-800">{record.vehicleNumber}</td>
                    <td className="py-4 px-4 text-gray-700">{record.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        record.type === 'Routine Service' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{record.description}</td>
                    <td className="py-4 px-4 text-gray-700">{record.cost.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-700">{record.nextService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Fuel Record Modal */}
      {showFuelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-800">Add Fuel Record</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  value={fuelFormData.vehicleNumber}
                  onChange={(e) => setFuelFormData({ ...fuelFormData, vehicleNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., NA-1234"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Date</label>
                <input
                  type="date"
                  value={fuelFormData.date}
                  onChange={(e) => setFuelFormData({ ...fuelFormData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Liters</label>
                <input
                  type="number"
                  value={fuelFormData.liters}
                  onChange={(e) => setFuelFormData({ ...fuelFormData, liters: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 85"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Cost (LKR)</label>
                <input
                  type="number"
                  value={fuelFormData.cost}
                  onChange={(e) => setFuelFormData({ ...fuelFormData, cost: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 12750"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-700">Odometer Reading</label>
              <input
                type="text"
                value={fuelFormData.odometer}
                onChange={(e) => setFuelFormData({ ...fuelFormData, odometer: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g., 125,430 km"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowFuelModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFuelRecord}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Maintenance Record Modal */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-800">Add Maintenance Record</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  value={maintenanceFormData.vehicleNumber}
                  onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, vehicleNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., NA-1234"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Date</label>
                <input
                  type="date"
                  value={maintenanceFormData.date}
                  onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Maintenance Type</label>
              <select
                value={maintenanceFormData.type}
                onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option>Routine Service</option>
                <option>Repair</option>
                <option>Emergency</option>
                <option>Inspection</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Description</label>
              <textarea
                value={maintenanceFormData.description}
                onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                rows={3}
                placeholder="Describe the maintenance work performed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Cost (LKR)</label>
                <input
                  type="number"
                  value={maintenanceFormData.cost}
                  onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, cost: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 8500"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Next Service Date</label>
                <input
                  type="date"
                  value={maintenanceFormData.nextService}
                  onChange={(e) => setMaintenanceFormData({ ...maintenanceFormData, nextService: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMaintenanceRecord}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
