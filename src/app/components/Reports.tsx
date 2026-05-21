import { useState } from 'react';
import { FileText, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<'trips' | 'fuel' | 'maintenance' | 'performance'>('trips');

  const tripData = [
    { month: 'Jan', trips: 1240, onTime: 1180, delayed: 60 },
    { month: 'Feb', trips: 1180, onTime: 1120, delayed: 60 },
    { month: 'Mar', trips: 1320, onTime: 1250, delayed: 70 },
    { month: 'Apr', trips: 1280, onTime: 1200, delayed: 80 },
    { month: 'May', trips: 1350, onTime: 1270, delayed: 80 },
  ];

  const fuelConsumption = [
    { route: 'Colombo-Kandy', consumption: 245 },
    { route: 'Galle-Matara', consumption: 180 },
    { route: 'Negombo-Colombo', consumption: 165 },
    { route: 'Anuradhapura-Jaffna', consumption: 285 },
  ];

  const maintenanceCosts = [
    { month: 'Jan', cost: 125000 },
    { month: 'Feb', cost: 98000 },
    { month: 'Mar', cost: 156000 },
    { month: 'Apr', cost: 142000 },
    { month: 'May', cost: 118000 },
  ];

  const routePerformance = [
    { name: 'On Time', value: 85 },
    { name: 'Delayed', value: 12 },
    { name: 'Cancelled', value: 3 },
  ];

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const handleDownloadPDF = () => {
    alert('PDF report generated! (This is a demo - in production, this would generate and download an actual PDF report)');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-gray-800">Reports & Analytics</h1>
        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF Report
        </button>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedReport('trips')}
            className={`p-4 rounded-lg border ${
              selectedReport === 'trips'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <p className="text-sm text-gray-700">Trip Analysis</p>
          </button>

          <button
            onClick={() => setSelectedReport('fuel')}
            className={`p-4 rounded-lg border ${
              selectedReport === 'fuel'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <p className="text-sm text-gray-700">Fuel Consumption</p>
          </button>

          <button
            onClick={() => setSelectedReport('maintenance')}
            className={`p-4 rounded-lg border ${
              selectedReport === 'maintenance'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <p className="text-sm text-gray-700">Maintenance Costs</p>
          </button>

          <button
            onClick={() => setSelectedReport('performance')}
            className={`p-4 rounded-lg border ${
              selectedReport === 'performance'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            <p className="text-sm text-gray-700">Route Performance</p>
          </button>
        </div>
      </div>

      {/* Trip Analysis Report */}
      {selectedReport === 'trips' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Monthly Trip Completion Analysis</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tripData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#10b981" name="On Time" />
              <Bar dataKey="delayed" fill="#f59e0b" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Trips (May)</p>
              <p className="text-2xl text-gray-800">1,350</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">On-Time Rate</p>
              <p className="text-2xl text-green-600">94.1%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Delayed Trips</p>
              <p className="text-2xl text-orange-600">80</p>
            </div>
          </div>
        </div>
      )}

      {/* Fuel Consumption Report */}
      {selectedReport === 'fuel' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Fuel Consumption by Route (Liters/Day)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={fuelConsumption} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="route" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#3b82f6" name="Fuel Consumption (L)" />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Fuel (May)</p>
              <p className="text-2xl text-gray-800">2,475 L</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average per Route</p>
              <p className="text-2xl text-blue-600">218.75 L</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Cost</p>
              <p className="text-2xl text-gray-800">LKR 371,250</p>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Costs Report */}
      {selectedReport === 'maintenance' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Monthly Maintenance Costs Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={maintenanceCosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#8b5cf6" strokeWidth={3} name="Maintenance Cost (LKR)" />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Cost (5 Months)</p>
              <p className="text-2xl text-gray-800">LKR 639,000</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average Monthly</p>
              <p className="text-2xl text-purple-600">LKR 127,800</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Highest Month</p>
              <p className="text-2xl text-gray-800">Mar (156K)</p>
            </div>
          </div>
        </div>
      )}

      {/* Route Performance Report */}
      {selectedReport === 'performance' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl mb-4 text-gray-800">Overall Route Performance Distribution</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={routePerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {routePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">On Time Performance</p>
              <p className="text-3xl text-green-600">85%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm text-gray-600 mb-1">Delayed</p>
              <p className="text-3xl text-orange-600">12%</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-sm text-gray-600 mb-1">Cancelled</p>
              <p className="text-3xl text-red-600">3%</p>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-4 text-gray-800">Key Insights & Recommendations</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-3 mt-0.5">Positive</span>
            <p className="text-gray-700">Overall on-time performance remains strong at 94.1% for May 2026</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-3 mt-0.5">Insight</span>
            <p className="text-gray-700">Anuradhapura-Jaffna route has the highest fuel consumption - consider route optimization</p>
          </li>
          <li className="flex items-start">
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs mr-3 mt-0.5">Action</span>
            <p className="text-gray-700">Maintenance costs peaked in March - review maintenance scheduling to distribute costs more evenly</p>
          </li>
          <li className="flex items-start">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-3 mt-0.5">Success</span>
            <p className="text-gray-700">Trip completion rate increased by 5.5% compared to February</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
