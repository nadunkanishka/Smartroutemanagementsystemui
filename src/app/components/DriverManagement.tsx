import { useState } from 'react';
import { Plus, Edit, Trash2, User, Phone, IdCard, Calendar } from 'lucide-react';

interface DriverData {
  id: number;
  name: string;
  licenseNumber: string;
  licenseExpiry: string;
  phone: string;
  assignedRoute: string;
  workingHours: string;
  status: string;
}

export default function DriverManagement() {
  const [drivers, setDrivers] = useState<DriverData[]>([
    { id: 1, name: 'K. Silva', licenseNumber: 'DL-12345', licenseExpiry: '2026-12-15', phone: '+94 71 234 5678', assignedRoute: 'Colombo - Kandy', workingHours: '8 hrs', status: 'Active' },
    { id: 2, name: 'R. Fernando', licenseNumber: 'DL-23456', licenseExpiry: '2025-08-20', phone: '+94 77 345 6789', assignedRoute: 'Galle - Matara', workingHours: '8 hrs', status: 'Active' },
    { id: 3, name: 'S. Perera', licenseNumber: 'DL-34567', licenseExpiry: '2026-03-10', phone: '+94 76 456 7890', assignedRoute: 'Negombo - Colombo', workingHours: '6 hrs', status: 'Active' },
    { id: 4, name: 'M. Kumar', licenseNumber: 'DL-45678', licenseExpiry: '2025-06-30', phone: '+94 75 567 8901', assignedRoute: 'Anuradhapura - Jaffna', workingHours: '10 hrs', status: 'Active' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    licenseNumber: '',
    licenseExpiry: '',
    phone: '',
    assignedRoute: '',
    workingHours: ''
  });

  const handleAddDriver = () => {
    if (formData.name && formData.licenseNumber && formData.phone) {
      const newDriver: DriverData = {
        id: drivers.length + 1,
        name: formData.name,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
        phone: formData.phone,
        assignedRoute: formData.assignedRoute,
        workingHours: formData.workingHours,
        status: 'Active'
      };
      setDrivers([...drivers, newDriver]);
      setShowModal(false);
      setFormData({ name: '', licenseNumber: '', licenseExpiry: '', phone: '', assignedRoute: '', workingHours: '' });
    }
  };

  const handleDeleteDriver = (id: number) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const checkLicenseExpiry = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    if (expiryDate < today) return 'expired';
    if (expiryDate < thirtyDaysFromNow) return 'expiring-soon';
    return 'valid';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Driver Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Driver
        </button>
      </div>

      {/* Driver Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Total Drivers</h3>
          <p className="text-3xl text-gray-800">{drivers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Active Drivers</h3>
          <p className="text-3xl text-green-600">{drivers.filter(d => d.status === 'Active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm mb-2">Licenses Expiring Soon</h3>
          <p className="text-3xl text-orange-600">
            {drivers.filter(d => checkLicenseExpiry(d.licenseExpiry) === 'expiring-soon').length}
          </p>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-4 text-gray-700">Driver Name</th>
                <th className="text-left py-4 px-4 text-gray-700">License Number</th>
                <th className="text-left py-4 px-4 text-gray-700">License Expiry</th>
                <th className="text-left py-4 px-4 text-gray-700">Phone</th>
                <th className="text-left py-4 px-4 text-gray-700">Assigned Route</th>
                <th className="text-left py-4 px-4 text-gray-700">Working Hours</th>
                <th className="text-left py-4 px-4 text-gray-700">Status</th>
                <th className="text-left py-4 px-4 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => {
                const licenseStatus = checkLicenseExpiry(driver.licenseExpiry);
                return (
                  <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-gray-800">{driver.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <IdCard className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{driver.licenseNumber}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        <span className={`text-sm ${
                          licenseStatus === 'expired' ? 'text-red-600' :
                          licenseStatus === 'expiring-soon' ? 'text-orange-600' :
                          'text-gray-700'
                        }`}>
                          {driver.licenseExpiry}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{driver.phone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{driver.assignedRoute}</td>
                    <td className="py-4 px-4 text-gray-700">{driver.workingHours}</td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {driver.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDriver(driver.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-800">Add New Driver</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., K. Silva"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="+94 71 234 5678"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="DL-12345"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">License Expiry Date</label>
                <input
                  type="date"
                  value={formData.licenseExpiry}
                  onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Assigned Route</label>
                <input
                  type="text"
                  value={formData.assignedRoute}
                  onChange={(e) => setFormData({ ...formData, assignedRoute: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Colombo - Kandy"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Working Hours</label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., 8 hrs"
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
                onClick={handleAddDriver}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
