import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Twitter, Search as SearchIcon, Calendar, MapPin, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const DemandDetector: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const trendData = [
    { time: '00:00', demand: 20, social: 15 },
    { time: '04:00', demand: 25, social: 22 },
    { time: '08:00', demand: 45, social: 38 },
    { time: '12:00', demand: 78, social: 65 },
    { time: '16:00', demand: 92, social: 89 },
    { time: '20:00', demand: 156, social: 142 },
    { time: '24:00', demand: 203, social: 198 }
  ];

  const categoryData = [
    { category: 'Electronics', spike: 85, color: '#3B82F6' },
    { category: 'Fashion', spike: 72, color: '#EF4444' },
    { category: 'Home & Garden', spike: 58, color: '#10B981' },
    { category: 'Sports', spike: 43, color: '#F59E0B' },
    { category: 'Beauty', spike: 67, color: '#8B5CF6' }
  ];

  const alerts = [
    {
      id: 1,
      product: 'iPhone 15 Cases',
      trigger: 'Apple Event Announcement',
      confidence: 94,
      expectedSpike: '+340%',
      timeframe: '24-48 hours',
      source: 'Twitter, Google Trends',
      status: 'critical',
      currentStock: 1200,
      recommendedStock: 4100,
      location: 'Nationwide'
    },
    {
      id: 2,
      product: 'Pink Clothing Items',
      trigger: 'Barbie Movie Release',
      confidence: 87,
      expectedSpike: '+180%',
      timeframe: '3-5 days',
      source: 'Social Media, Search',
      status: 'high',
      currentStock: 850,
      recommendedStock: 2400,
      location: 'Major Cities'
    },
    {
      id: 3,
      product: 'Generators & Flashlights',
      trigger: 'Hurricane Warning',
      confidence: 96,
      expectedSpike: '+450%',
      timeframe: '12-24 hours',
      source: 'Weather, News',
      status: 'critical',
      currentStock: 320,
      recommendedStock: 1760,
      location: 'Florida, Georgia'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'high': return 'from-orange-500 to-orange-600';
      default: return 'from-yellow-500 to-yellow-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'high': return 'bg-orange-50 border-orange-200';
      default: return 'bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">Retail Demand Spike Detector</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              RedAlert System
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor social media trends, local events, and search patterns to predict demand spikes 
            before they impact your inventory.
          </p>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Monitors', value: '247', icon: SearchIcon, color: 'blue', status: 'live' },
            { label: 'Predictions Today', value: '89%', icon: TrendingUp, color: 'green', status: 'up' },
            { label: 'Revenue Impact', value: '+18%', icon: Zap, color: 'purple', status: 'up' },
            { label: 'Critical Alerts', value: '12', icon: AlertTriangle, color: 'red', status: 'alert' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    stat.status === 'live' ? 'bg-green-400' :
                    stat.status === 'up' ? 'bg-blue-400' :
                    'bg-red-400'
                  }`}></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Trend Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Demand Trend Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Real-time Demand Tracking</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="time" stroke="#6b7280" />
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
                  dataKey="demand" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="social" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Spikes */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Category Spike Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="spike" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Active Demand Alerts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`${getStatusBg(alert.status)} backdrop-blur-xl rounded-3xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getStatusColor(alert.status)}`}>
                    {alert.status.toUpperCase()}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{alert.confidence}%</div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{alert.product}</h3>
                <p className="text-gray-600 mb-4">{alert.trigger}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expected Spike:</span>
                    <span className="font-bold text-red-600">{alert.expectedSpike}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Timeframe:</span>
                    <span className="font-medium text-gray-800">{alert.timeframe}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{alert.location}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Current Stock:</span>
                    <span className="font-medium text-gray-800">{alert.currentStock.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Recommended:</span>
                    <span className="font-bold text-green-600">{alert.recommendedStock.toLocaleString()}</span>
                  </div>
                </div>

                <button className={`w-full mt-4 bg-gradient-to-r ${getStatusColor(alert.status)} text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200`}>
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Monitoring */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <Twitter className="h-12 w-12 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Social Media Intelligence
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Our AI monitors millions of social media posts, news articles, and search queries 
              to identify emerging trends before they become mainstream demand spikes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '50M+ Posts', desc: 'Analyzed daily across platforms' },
                { title: '15 Languages', desc: 'Multi-language trend detection' },
                { title: '2-24 Hours', desc: 'Early warning lead time' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};