import React from 'react';
import { Brain, TrendingUp, Users, ShoppingCart, AlertTriangle, Zap, ArrowRight, Activity } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'substitute',
      title: 'Predictive Substitute Finder',
      description: 'AI-powered substitute recommendations before items go out of stock',
      icon: ShoppingCart,
      color: 'from-emerald-500 to-teal-500',
      stats: { accuracy: '94%', savings: '$2.3M', satisfaction: '4.8/5' },
      highlights: ['Real-time inventory tracking', 'Customer preference learning', 'Auto-replace functionality']
    },
    {
      id: 'demand',
      title: 'Retail Demand Spike Detector',
      description: 'Monitor social trends and predict demand spikes before they happen',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-500',
      stats: { prediction: '89%', revenue: '+18%', alerts: '247' },
      highlights: ['Social media monitoring', 'Event-based forecasting', 'Real-time alerts']
    },
    {
      id: 'staff',
      title: 'AI Workforce Scheduling',
      description: 'Optimize staff schedules based on predicted footfall and events',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      stats: { efficiency: '+32%', satisfaction: '4.6/5', costs: '-15%' },
      highlights: ['Predictive scheduling', 'Burnout prevention', 'Event integration']
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Walmart Sparkathon 2025</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI-Powered Retail
            </span>
            <br />
            <span className="text-gray-800">Intelligence Platform</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI solutions that predict, optimize, and transform retail operations 
            through intelligent automation and data-driven insights.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Revenue Impact', value: '+$12.8M', icon: TrendingUp, color: 'text-emerald-600' },
            { label: 'Accuracy Rate', value: '94.2%', icon: Activity, color: 'text-blue-600' },
            { label: 'Cost Reduction', value: '-23%', icon: AlertTriangle, color: 'text-orange-600' },
            { label: 'Stores Active', value: '1,247', icon: Brain, color: 'text-purple-600' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate(feature.id)}
              >
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(feature.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-gray-800">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  {feature.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <span>Explore Feature</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Innovation Showcase */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Future of Retail Intelligence
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Our AI platform combines predictive analytics, real-time monitoring, and intelligent automation 
              to revolutionize how retailers operate, reducing costs while improving customer satisfaction.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Predictive Power', desc: 'Forecast demand before it happens' },
                { title: 'Real-time Intelligence', desc: 'Monitor trends as they emerge' },
                { title: 'Automated Optimization', desc: 'Self-improving algorithms' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
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