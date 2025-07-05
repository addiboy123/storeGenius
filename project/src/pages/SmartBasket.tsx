import React, {  useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, User, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Inline types
type Product = {
  _id: string;
  product_name: string;
  final_price: number;
  image: string;
  short_description: string;
  nutrition?: {
    protein?: number;
    calories?: number;
  };
};

type BasketItem = {
  product: Product;
  quantity: number;
};

const SmartBasket: React.FC = () => {
  const {user} = useAuth();
  const [budget, setBudget] = useState<number>(500);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState<'search' | 'profile'>('search');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      setSearching(true);
      const response = await axios.get('/api/data/suggest', {
        params: { prompt: searchTerm },
      });
      const results: Product[] = response.data;
      setSearchResults(results);
      setBasket(results.map(product => ({ product, quantity: 1 })));
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  const getTotalCost = () =>
    basket.reduce((sum, item) => sum + item.product.final_price * item.quantity, 0);

  const getTotalItems = () =>
    basket.reduce((sum, item) => sum + item.quantity, 0);

  const getNutrition = () =>
    basket.reduce(
      (acc, item) => {
        acc.protein += (item.product.nutrition?.protein || 0) * item.quantity;
        acc.calories += (item.product.nutrition?.calories || 0) * item.quantity;
        return acc;
      },
      { protein: 0, calories: 0 }
    );

  const removeItem = (id: string) => {
    setBasket(prev => prev.filter(item => item.product._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">SmartBasket 🛒</h1>
        <div className="flex gap-4">
          <button onClick={() => setView('search')} className="hover:text-green-600">Search</button>
          <button onClick={() => setView('profile')} className="hover:text-green-600">Profile</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {view === 'search' && (
          <>
            {/* Search */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by prompt..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300"
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
              >
                <Search className="inline-block mr-2" size={18} /> Search
              </button>
            </div>

            {searching && <p className="text-gray-600 mb-4">🔍 Searching...</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-xl shadow border"
                >
                  <img src={product.image} alt={product.product_name} className="w-full h-40 object-cover mb-2 rounded" />
                  <h3 className="font-semibold text-gray-900">{product.product_name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.short_description}</p>
                  <p className="text-green-600 font-bold mt-1">₹{product.final_price}</p>
                </motion.div>
              ))}
            </div>

            {basket.length > 0 && (
              <div className="mt-10 bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold mb-4">Smart Basket</h3>
                <div className="space-y-4">
                  {basket.map((item) => (
                    <div key={item.product._id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.product.product_name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-green-700 font-bold">₹{item.product.final_price * item.quantity}</p>
                        <button onClick={() => removeItem(item.product._id)}>
                          <Trash2 className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {view === 'profile' && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-green-500" size={24} />
              <h2 className="text-xl font-semibold">Profile</h2>
            </div>
            <p><span className="font-semibold">Name:</span> {user?.fullName || 'Guest'}</p>
            <p><span className="font-semibold">Budget:</span> ₹{budget}</p>
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold mb-2">Basket Summary</h3>
              <p>Total Cost: ₹{getTotalCost()}</p>
              <p>Total Items: {getTotalItems()}</p>
              <p>Protein: {getNutrition().protein}g</p>
              <p>Calories: {getNutrition().calories}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBasket;
