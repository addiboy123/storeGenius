import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, TrendingUp, Download, RefreshCw, LogOut, Activity, Calendar, Clock, Search, ArrowUp, Eye
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';

const RedAlert: React.FC = () => {
  const { user, logout } = useAuth();
  const [spikeProducts, setSpikeProducts] = useState<Product[]>([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpikeData();
  }, []);

  const fetchSpikeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/data/get-suggestions");
      const enrichedData = response.data.data || [];

      const allProducts = enrichedData.flatMap((categoryBlock: any, idx: number) => {
        return categoryBlock.products.map((p: any, i: number) => ({
          id: `${idx}-${i}`,
          name: p.name,
          image: p.image,
          category: categoryBlock.category,
          price: Math.floor(Math.random() * 4000) + 1000,
          stock: Math.floor(Math.random() * 100) + 10,
          spikeData: {
            percentage: Math.floor(Math.random() * 50) + 70,
            timestamp: new Date().toISOString(),
            suggestedRestock: Math.floor(Math.random() * 40) + 10
          }
        }));
      });

      setSpikeProducts(allProducts);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("❌ Failed to fetch from /get-suggestions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchSpikeData();
    setIsRefreshing(false);
  };

  const getSpikeColor = (percentage: number) => {
    if (percentage >= 100) return 'text-red-600 bg-red-100 border-red-200';
    if (percentage >= 80) return 'text-orange-600 bg-orange-100 border-orange-200';
    return 'text-yellow-600 bg-yellow-100 border-yellow-200';
  };

  const getSpikeIcon = (percentage: number) => {
    if (percentage >= 100) return <ArrowUp className="text-red-600" size={16} />;
    if (percentage >= 80) return <TrendingUp className="text-orange-600" size={16} />;
    return <Activity className="text-yellow-600" size={16} />;
  };

  const filteredProducts = spikeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadReport = () => {
    const csvContent = [
      ['Product Name', 'Spike Percentage', 'Current Stock', 'Suggested Restock', 'Category', 'Price', 'Timestamp'],
      ...filteredProducts.map(product => [
        product.name,
        `${product.spikeData?.percentage}%`,
        product.stock.toString(),
        product.spikeData?.suggestedRestock.toString() || '0',
        product.category,
        `₹${product.price}`,
        new Date(product.spikeData?.timestamp || '').toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demand-spike-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const categories = ['all', ...Array.from(new Set(spikeProducts.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-red-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 rounded-xl shadow-lg">
                <AlertTriangle className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Demand Spike Detector
                </h1>
                <p className="text-gray-600 font-medium">Real-time inventory monitoring & analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user?.fullName}</p>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4 animate-pulse">⏳</div>
            <p className="text-lg text-gray-600 font-medium">Loading spike data...</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-red-200">
                <p className="text-sm text-gray-500 mb-1">Critical Alerts</p>
                <h2 className="text-3xl font-bold text-red-600">{filteredProducts.filter(p => p.spikeData?.percentage >= 100).length}</h2>
                <p className="text-xs text-red-400 mt-1">Immediate restock needed</p>
              </div>
              <div className="p-6 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-orange-200">
                <p className="text-sm text-gray-500 mb-1">Total Spikes</p>
                <h2 className="text-3xl font-bold text-orange-600">{filteredProducts.length}</h2>
                <p className="text-xs text-orange-400 mt-1">Trending products</p>
              </div>
              <div className="p-6 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-blue-200">
                <p className="text-sm text-gray-500 mb-1">Avg Spike</p>
                <h2 className="text-3xl font-bold text-blue-600">{
                  Math.round(
                    filteredProducts.reduce((acc, p) => acc + (p.spikeData?.percentage || 0), 0) /
                    (filteredProducts.length || 1)
                  )
                }%</h2>
                <p className="text-xs text-blue-400 mt-1">Across all products</p>
              </div>
              <div className="p-6 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-green-200">
                <p className="text-sm text-gray-500 mb-1">Restock Units</p>
                <h2 className="text-3xl font-bold text-green-600">{
                  filteredProducts.reduce((acc, p) => acc + (p.spikeData?.suggestedRestock || 0), 0)
                }</h2>
                <p className="text-xs text-green-400 mt-1">Suggested total</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent w-full"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <RefreshCw className={isRefreshing ? 'animate-spin' : ''} size={18} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={downloadReport}
                  className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
                >
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition"
                >
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-2xl" />
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <span className="text-xs font-semibold bg-black/50 text-white px-3 py-1 rounded-lg">
                        {product.category.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${getSpikeColor(product.spikeData?.percentage || 0)}`}>
                        {getSpikeIcon(product.spikeData?.percentage || 0)} +{product.spikeData?.percentage}%
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <div className="text-sm text-gray-600 mb-2">₹{product.price}</div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Current Stock</p>
                        <p className="text-lg font-bold">{product.stock}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-500">Suggested Restock</p>
                        <p className="text-lg font-bold text-blue-600">{product.spikeData?.suggestedRestock}</p>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-medium mb-2">
                      Revenue Impact: ₹{((product.spikeData?.suggestedRestock || 0) * product.price).toLocaleString()}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(product.spikeData?.timestamp || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{new Date(product.spikeData?.timestamp || '').toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-xl hover:from-red-700 hover:to-orange-700 flex items-center justify-center gap-2">
                      <Eye size={16} /> View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Spike Alerts Found</h3>
                <p className="text-gray-500">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'Try adjusting your search filters.'
                    : 'All products are within normal demand ranges.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RedAlert;