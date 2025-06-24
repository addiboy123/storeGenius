import React, { useState } from 'react';
import { Search, ShoppingCart, AlertTriangle, CheckCircle, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';

export const SubstituteFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: 1,
      name: 'Organic Whole Milk',
      brand: 'Great Value',
      price: 3.98,
      stock: 12,
      stockStatus: 'low',
      category: 'Dairy',
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=300',
      substitutes: [
        { name: '2% Reduced Fat Milk', brand: 'Great Value', price: 3.68, compatibility: 95, reason: 'Same brand, similar nutrition' },
        { name: 'Organic 2% Milk', brand: 'Horizon', price: 4.28, compatibility: 92, reason: 'Organic preference match' },
        { name: 'Lactose-Free Whole Milk', brand: 'Lactaid', price: 4.98, compatibility: 88, reason: 'Dietary consideration' }
      ]
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 1199.99,
      stock: 3,
      stockStatus: 'critical',
      category: 'Electronics',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
      substitutes: [
        { name: 'iPhone 15 Pro', brand: 'Apple', price: 999.99, compatibility: 94, reason: 'Same generation, similar features' },
        { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 1299.99, compatibility: 89, reason: 'Premium Android alternative' },
        { name: 'iPhone 14 Pro Max', brand: 'Apple', price: 899.99, compatibility: 91, reason: 'Previous generation, lower price' }
      ]
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-6">
            <ShoppingCart className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">Predictive Substitute Finder</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Smart Product Substitution
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered recommendations that predict stockouts and suggest perfect alternatives 
            based on customer preferences and purchase history.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products to analyze substitution options..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Products Monitored', value: '47,832', icon: ShoppingCart, color: 'emerald' },
            { label: 'Substitutions Made', value: '12,847', icon: ArrowRight, color: 'blue' },
            { label: 'Customer Satisfaction', value: '4.8/5', icon: Star, color: 'yellow' },
            { label: 'Revenue Saved', value: '$2.3M', icon: TrendingUp, color: 'green' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockColor(product.stockStatus)}`}>
                      {product.stock} left
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{product.brand}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>

              {/* Stock Alert */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Low Stock Alert</p>
                    <p className="text-sm text-orange-600">Predicted to run out in 2-3 days based on current demand</p>
                  </div>
                </div>
              </div>

              {/* Substitutes */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Recommended Substitutes</h4>
                <div className="space-y-3">
                  {product.substitutes.map((substitute, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h5 className="font-medium text-gray-800">{substitute.name}</h5>
                          <span className="text-sm text-gray-500">{substitute.brand}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{substitute.reason}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-gray-800">${substitute.price}</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                                style={{ width: `${substitute.compatibility}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-emerald-600">{substitute.compatibility}%</span>
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-Replace Toggle */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-blue-800">Auto-Replace Feature</h5>
                    <p className="text-sm text-blue-600">Automatically substitute when out of stock</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};