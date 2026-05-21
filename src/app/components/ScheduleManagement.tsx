import { useState } from 'react';
import { Plus, Clock, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';

interface ScheduleData {
  id: number;
  route: string;
  bus: string;
  driver: string;
  departureTime: string;
  arrivalTime: string;
  frequency: string;
  status: string;
}

export default function ScheduleManagement() {
  const [schedules, setSchedules] = useState<ScheduleData[]>([
    { id: 1, route: 'Colombo - Kandy', bus: 'NA-1234', driver: 'K. Silva', departureTime: '08:30 AM', arrivalTime: '11:00 AM', frequency: 'Daily', status: 'Active' },
    { id: 2, route: 'Galle - Matara', bus: 'WP-5678', driver: 'R. Fernando', departureTime: '09:00 AM', arrivalTime: '10:15 AM', frequency: 'Daily', status: 'Active' },
    { id: 3, route: 'Negombo - Colombo', bus: 'WP-9012', driver: 'S. Perera', departureTime: '07:00 AM', arrivalTime: '08:30 AM', frequency: 'Weekdays', status: 'Active' },
    { id: 4, route: 'Anuradhapura - Jaffna', bus: 'NC-3456', driver: 'M. Kumar', departureTime: '06:00 AM', arrivalTime: '09:45 AM', frequency: 'Daily', status: 'Active' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [formData, setFormData] = useState({
    route: '',
    bus: '',
    driver: '',
    departureTime: '',
    arrivalTime: '',
    frequency: 'Daily'
  });

  const handleAddSchedule = () => {
    if (formData.route && formData.bus && formData.departureTime) {
      const newSchedule: ScheduleData = {
        id: schedules.length + 1,
        route: formData.route,
        bus: formData.bus,
        driver: formData.driver,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        frequency: formData.frequency,
        status: 'Active'
      };
      setSchedules([...schedules, newSchedule]);
      setShowModal(false);
      setFormData({ route: '', bus: '', driver: '', departureTime: '', arrivalTime: '', frequency: 'Daily' });
    }
  };

  const checkConflicts = () => {
    const conflicts: string[] = [];
    schedules.forEach((schedule, index) => {
      schedules.slice(index + 1).forEach(otherSchedule => {
        if (schedule.bus === otherSchedule.bus && schedule.departureTime === otherSchedule.departureTime) {
          conflicts.push(`${schedule.bus} has conflicting schedules at ${schedule.departureTime}`);
        }
      });
    });
    return conflicts;
  };

  const conflicts = checkConflicts();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Schedule Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Schedule
        </button>
      </div>

      {/* View Selector */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView('daily')}
            className={`px-4 py-2 rounded-lg ${selectedView === 'daily' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Daily View
          </button>
          <button
            onClick={() => setSelectedView('weekly')}
            className={`px-4 py-2 rounded-lg ${selectedView === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setSelectedView('monthly')}
            className={`px-4 py-2 rounded-lg ${selectedView === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Monthly View
          </button>
        </div>
      </div>

      {/* Conflict Alerts */}
      {conflicts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
            <div>
              <h3 className="text-red-800 mb-2">Schedule Conflicts Detected</h3>
              {conflicts.map((conflict, index) => (
                <p key={index} className="text-sm text-red-700">{conflict}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedules Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-4 px-4 text-gray-700">Route</th>
                <th className="text-left py-4 px-4 text-gray-700">Bus</th>
                <th className="text-left py-4 px-4 text-gray-700">Driver</th>
                <th className="text-left py-4 px-4 text-gray-700">Departure</th>
                <th className="text-left py-4 px-4 text-gray-700">Arrival</th>
                <th className="text-left py-4 px-4 text-gray-700">Frequency</th>
                <th className="text-left py-4 px-4 text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-800">{schedule.route}</td>
                  <td className="py-4 px-4 text-gray-700">{schedule.bus}</td>
                  <td className="py-4 px-4 text-gray-700">{schedule.driver}</td>
                  <td className="py-4 px-4 text-gray-700">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {schedule.departureTime}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {schedule.arrivalTime}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{schedule.frequency}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {schedule.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl mb-4 text-gray-800">Add New Schedule</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Route</label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., Colombo - Kandy"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Bus</label>
                <input
                  type="text"
                  value={formData.bus}
                  onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g., NA-1234"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Driver</label>
              <input
                type="text"
                value={formData.driver}
                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g., K. Silva"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Departure Time</label>
                <input
                  type="time"
                  value={formData.departureTime}
                  onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700">Arrival Time</label>
                <input
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2 text-gray-700">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option>Daily</option>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Weekly</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
