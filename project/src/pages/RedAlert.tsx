// RedAlert.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, TrendingUp, Download, RefreshCw, LogOut, Activity, Calendar, Clock, Search, ArrowUp, Eye, LayoutGrid, Table
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import ProductModal from "./ProductModal"

const RedAlert: React.FC = () => {
  const { user, logout } = useAuth();
  const [spikeProducts, setSpikeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchSpikeData();
  }, []);

  const fetchSpikeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/data/get-suggestions");
      const enrichedData = response.data.data || [];

      const allProducts = enrichedData.flatMap((categoryBlock: any, idx: number) =>
        categoryBlock.products.map((p: any, i: number) => ({
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
        }))
      );

      setSpikeProducts(allProducts);
    } catch (error) {
      console.error("❌ Failed to fetch from /get-suggestions:", error.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const getSpikeColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-100 text-red-700';
    if (percentage >= 80) return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  const filteredProducts = spikeProducts.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = ['all', ...Array.from(new Set(spikeProducts.map(p => p.category)))];

  const downloadReport = () => {
    const csvContent = [
      ['Product Name', 'Spike %', 'Stock', 'Restock', 'Category', 'Price', 'Timestamp'],
      ...filteredProducts.map(product => [
        product.name,
        `${product.spikeData?.percentage}%`,
        product.stock,
        product.spikeData?.suggestedRestock || 0,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AlertTriangle size={30} className="text-red-600" />
          <h1 className="text-xl font-bold text-red-700">Demand Spike Detector</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-sm">Welcome, <strong>{user?.fullName}</strong></span>
          <button
            onClick={logout}
            className="flex items-center text-sm px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <LogOut size={16} className="mr-1" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search size={16} className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Search products..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-sm rounded-full border ${
                  selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchSpikeData}
              disabled={isRefreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin mr-1' : 'mr-1'} />
              Refresh
            </button>
            <button
              onClick={downloadReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Download size={16} className="mr-1" />
              Export
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
              className="px-3 py-2 border rounded-lg hover:bg-gray-100"
            >
              {viewMode === 'grid' ? <Table size={16} /> : <LayoutGrid size={16} />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Critical Alerts" value={filteredProducts.filter(p => p.spikeData?.percentage >= 100).length} color="text-red-600" />
          <StatCard title="Total Spikes" value={filteredProducts.length} color="text-orange-600" />
          <StatCard
            title="Avg Spike %"
            value={
              Math.round(
                filteredProducts.reduce((sum, p) => sum + (p.spikeData?.percentage || 0), 0) /
                Math.max(filteredProducts.length, 1)
              )
            }
            color="text-blue-600"
          />
          <StatCard
            title="Suggested Units"
            value={filteredProducts.reduce((sum, p) => sum + (p.spikeData?.suggestedRestock || 0), 0)}
            color="text-green-600"
          />
        </div>

        {/* Main View */}
        {loading ? (
          <div className="text-center text-gray-600 text-lg py-32 animate-pulse">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <div className="text-4xl mb-3">🔍</div>
            No spikes found with current filters.
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setModalProduct(product)}
                  className="cursor-pointer bg-white shadow-md hover:shadow-lg border rounded-2xl overflow-hidden transition-transform hover:scale-[1.01]"
                >
                  <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-gray-700 font-medium">₹{product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getSpikeColor(product.spikeData?.percentage || 0)}`}>
                        +{product.spikeData?.percentage}%
                      </span>
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="w-full text-left table-auto">
              <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
                <tr>
                  <th className="p-3">Product</th>
                  <th>Category</th>
                  <th>Spike %</th>
                  <th>Stock</th>
                  <th>Restock</th>
                  <th>Revenue Impact</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setModalProduct(product)}>
                    <td className="p-3">{product.name}</td>
                    <td>{product.category}</td>
                    <td>+{product.spikeData?.percentage}%</td>
                    <td>{product.stock}</td>
                    <td>{product.spikeData?.suggestedRestock}</td>
                    <td>₹{(product.price * (product.spikeData?.suggestedRestock || 0)).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, color }: { title: string, value: number | string, color: string }) => (
  <div className={`p-4 bg-white rounded-xl shadow-sm border-l-4 ${color}`}>
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className={`text-3xl font-bold ${color}`}>{value}</h2>
  </div>
);

export default RedAlert;
