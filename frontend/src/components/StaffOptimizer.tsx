import React, { useState } from 'react';
import { Users, Calendar, Clock, TrendingUp, MapPin, AlertCircle, CheckCircle, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const StaffOptimizer: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState('store-1');

  const footfallData = [
    { hour: '6AM', predicted: 45, actual: 42, staff: 3 },
    { hour: '8AM', predicted: 120, actual: 118, staff: 5 },
    { hour: '10AM', predicted: 180, actual: 175, staff: 7 },
    { hour: '12PM', predicted: 280, actual: 285, staff: 12 },
    { hour: '2PM', predicted: 320, actual: 315, staff: 14 },
    { hour: '4PM', predicted: 380, actual: 390, staff: 16 },
    { hour: '6PM', predicted: 450, actual: 445, staff: 18 },
    { hour: '8PM', predicted: 280, actual: 275, staff: 12 },
    { hour: '10PM', predicted: 120, actual: 125, staff: 6 }
  ];

  const weeklyData = [
    { day: 'Mon', efficiency: 85, satisfaction: 4.2, coverage: 92 },
    { day: 'Tue', efficiency: 88, satisfaction: 4.4, coverage: 94 },
    { day: 'Wed', efficiency: 82, satisfaction: 4.1, coverage: 89 },
    { day: 'Thu', efficiency: 91, satisfaction: 4.6, coverage: 96 },
    { day: 'Fri', efficiency: 94, satisfaction: 4.8, coverage: 98 },
    { day: 'Sat', efficiency: 89, satisfaction: 4.5, coverage: 95 },
    { day: 'Sun', efficiency: 87, satisfaction: 4.3, coverage: 93 }
  ];

  const stores = [
    {
      id: 'store-1',
      name: 'Downtown Supercenter',
      location: 'New York, NY',
      staff: 45,
      efficiency: 94,
      satisfaction: 4.6,
      alerts: 2
    },
    {
      id: 'store-2',
      name: 'Suburban Plaza',
      location: 'Austin, TX',
      staff: 32,
      efficiency: 89,
      satisfaction: 4.4,
      alerts: 1
    },
    {
      id: 'store-3',
      name: 'Mall Location',
      location: 'Los Angeles, CA',
      staff: 38,
      efficiency: 91,
      satisfaction: 4.5,
      alerts: 3
    }
  ];

  const scheduleOptimizations = [
    {
      id: 1,
      title: 'Black Friday Preparation',
      date: 'Nov 24, 2025',
      impact: '+40% footfall expected',
      recommendation: 'Increase staff by 65%',
      status: 'pending',
      confidence: 96
    },
    {
      id: 2,
      title: 'Local Concert Event',
      date: 'Dec 15, 2025',
      impact: '+25% evening traffic',
      recommendation: 'Add 8 evening shifts',
      status: 'approved',
      confidence: 87
    },
    {
      id: 3,
      title: 'Weather Alert - Snow',
      date: 'Dec 20, 2025',
      impact: '-30% morning traffic',
      recommendation: 'Reduce morning staff by 20%',
      status: 'implemented',
      confidence: 92
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-blue-600 bg-blue-50';
      default: return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full mb-6">
            <Users className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">AI Workforce Scheduling Assistant</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Staff Optimizer
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict store footfall and create AI-optimized shift schedules that reduce burnout 
            while improving customer service and operational efficiency.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Efficiency Gain', value: '+32%', icon: TrendingUp, color: 'green' },
            { label: 'Staff Satisfaction', value: '4.6/5', icon: Star, color: 'yellow' },
            { label: 'Cost Reduction', value: '-15%', icon: Clock, color: 'blue' },
            { label: 'Coverage Rate', value: '96%', icon: CheckCircle, color: 'purple' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Store Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => setSelectedStore(store.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  selectedStore === store.id
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-purple-500 shadow-lg'
                    : 'bg-white/70 backdrop-blur-xl border-white/20 text-gray-800 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{store.name}</h3>
                  {store.alerts > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {store.alerts}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm opacity-80 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {store.location}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="font-medium">{store.staff}</div>
                    <div className="opacity-70">Staff</div>
                  </div>
                  <div>
                    <div className="font-medium">{store.efficiency}%</div>
                    <div className="opacity-70">Efficiency</div>
                  </div>
                  <div>
                    <div className="font-medium">{store.satisfaction}</div>
                    <div className="opacity-70">Rating</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Footfall Prediction */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Today's Footfall vs Staff Schedule</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={footfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  name="Predicted Footfall"
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  name="Actual Footfall"
                />
                <Bar dataKey="staff" fill="#3b82f6" name="Staff Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Performance */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="efficiency" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Efficiency %" />
                <Bar dataKey="coverage" fill="#10b981" radius={[4, 4, 0, 0]} name="Coverage %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Schedule Optimizations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">AI Schedule Recommendations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {scheduleOptimizations.map((optimization) => (
              <div
                key={optimization.id}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(optimization.status)}`}>
                    {optimization.status.toUpperCase()}
                  </span>
                  <div className="text-sm font-medium text-gray-600">{optimization.confidence}% confidence</div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{optimization.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {optimization.date}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Impact:</span>
                    <span className="font-medium text-gray-800">{optimization.impact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Action:</span>
                    <span className="font-medium text-blue-600">{optimization.recommendation}</span>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
                  optimization.status === 'implemented' 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : optimization.status === 'approved'
                    ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg'
                }`}>
                  {optimization.status === 'implemented' ? 'Implemented' :
                   optimization.status === 'approved' ? 'Approved' : 'Review & Approve'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-12 w-12 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Intelligent Workforce Management
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Our AI analyzes historical sales data, weather patterns, local events, and seasonal trends 
              to create optimal staff schedules that balance efficiency with employee satisfaction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Predictive Analytics', desc: 'Forecast footfall with 94% accuracy' },
                { title: 'Smart Scheduling', desc: 'Optimize shifts automatically' },
                { title: 'Burnout Prevention', desc: 'Monitor workload and satisfaction' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-purple-100 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};