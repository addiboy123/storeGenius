import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  BarChart3, 
  
  ArrowRight,
  CheckCircle,
  
  Target,
  Sparkles,
  AlertTriangle,
  Activity,
  PieChart,
  
} from 'lucide-react';

const Landing: React.FC = () => {
  const stats = [
    { value: '+₹12.8M', label: 'Revenue Impact', icon: TrendingUp, color: 'text-green-600' },
    { value: '94.2%', label: 'Accuracy Rate', icon: Target, color: 'text-blue-600' },
    { value: '-23%', label: 'Cost Reduction', icon: BarChart3, color: 'text-orange-600' },
    { value: '1,247', label: 'Stores Active', icon: Users, color: 'text-purple-600' }
  ];

  const features = [
    {
      title: 'Demand Spike Detector',
      description: 'Real-time monitoring with predictive analytics and social trend analysis',
      icon: AlertTriangle,
      color: 'bg-gradient-to-br from-red-500 to-orange-500',
      role: 'Staff',
      metrics: [
        { label: 'Prediction', value: '94%' },
        { label: 'Alerts', value: '247' },
        { label: 'Accuracy', value: '89%' }
      ],
      features: [
        'Real-time spike detection',
        'Social media monitoring',
        'Predictive restocking alerts',
        'Interactive analytics dashboard',
        'Export reports & insights'
      ],
      preview: 'Advanced analytics with heat maps, trend graphs, and real-time alerts'
    },
    {
      title: 'Smart Basket Builder',
      description: 'AI-powered budget optimization with intelligent product recommendations',
      icon: ShoppingCart,
      color: 'bg-gradient-to-br from-green-500 to-blue-500',
      role: 'Customer',
      metrics: [
        { label: 'Savings', value: '₹2.3M' },
        { label: 'Accuracy', value: '96%' },
        { label: 'Satisfaction', value: '4.8/5' }
      ],
      features: [
        'Budget-based optimization',
        'Nutritional analysis',
        'Dietary preference filters',
        'Value-for-money scoring',
        'Smart substitute suggestions'
      ],
      preview: 'Dynamic basket building with real-time budget tracking and nutrition insights'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                <Brain className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StoreGenius
                </h1>
                <p className="text-xs text-gray-500 font-medium">AI Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-1">
                <button className="flex items-center space-x-2 text-blue-600 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
                  <Activity size={16} />
                  <span>Dashboard</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  <AlertTriangle size={16} />
                  <span>Demand Detector</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  <ShoppingCart size={16} />
                  <span>Smart Basket</span>
                </button>
              </nav>
              
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
              <Sparkles size={18} />
              <span>StoreGenius Sparkathon 2025 - Next-Gen Retail Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                AI-Powered Retail
              </span>
              <br />
              <span className="text-gray-900">Intelligence Platform</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary AI solutions that predict demand spikes, optimize budgets, and transform retail operations 
              through intelligent automation, real-time analytics, and data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized AI Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built tools for staff and customers with advanced analytics and intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <div className="text-right">
                    <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      For {feature.role}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{feature.description}</p>
                
                {/* Enhanced Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {feature.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      <div className="text-xs text-gray-500 font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Feature List */}
                <div className="space-y-3 mb-6">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-gray-700">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-600 italic">
                    💡 {feature.preview}
                  </p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <span>Explore {feature.title}</span>
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-bold mb-6">The Future of Retail Intelligence</h2>
              <p className="text-xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                Our AI platform combines predictive analytics, real-time monitoring, and intelligent automation to 
                revolutionize how retailers operate and make data-driven decisions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <Activity size={18} />
                  <span className="font-medium">Real-time Analytics</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <AlertTriangle size={18} />
                  <span className="font-medium">Demand Detection</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <ShoppingCart size={18} />
                  <span className="font-medium">Smart Optimization</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <PieChart size={18} />
                  <span className="font-medium">Advanced Reports</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>Get Started</span>
                  <ArrowRight size={22} />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">StoreGenius</h3>
                <p className="text-gray-400">AI Intelligence Platform</p>
              </div>
            </div>
            <div className="text-gray-400">
              © 2025 StoreGenius. Built for Sparkathon 2025. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 px-6 py-4"
        >
          <div className="flex items-center space-x-6">
            <Link
              to="/register"
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="bg-red-100 group-hover:bg-red-200 p-3 rounded-xl transition-colors">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">Demand Detector</div>
                <div className="text-xs text-gray-500">For Staff</div>
              </div>
            </Link>
            
            <div className="w-px h-12 bg-gray-200"></div>
            
            <Link
              to="/register"
              className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors group"
            >
              <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-xl transition-colors">
                <ShoppingCart size={20} className="text-green-600" />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">Smart Basket</div>
                <div className="text-xs text-gray-500">For Customers</div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;