import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  ShoppingBasket,
  Filter,
  RefreshCw,
  Plus,
  LogOut,
  DollarSign,
  PieChart,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Heart,
  Leaf,
  Award,
  Search,
  Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProducts } from '../data/mockData';
import { Product, BasketItem } from '../types';

const SmartBasket: React.FC = () => {
  const { user, logout } = useAuth();
  const [budget, setBudget] = useState<number>(500);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [suggestedBasket, setSuggestedBasket] = useState<BasketItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  const categories = ['all', 'essentials', 'snacks', 'fruits', 'dairy', 'beverages', 'supplements'];
  const dietaryOptions = ['all', 'veg', 'vegan', 'protein-rich'];

  const filterProducts = (): Product[] => {
    return mockProducts.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (dietaryFilter !== 'all') {
        if (dietaryFilter === 'veg' && !product.nutrition?.isVeg) return false;
        if (dietaryFilter === 'vegan' && !product.nutrition?.isVegan) return false;
        if (dietaryFilter === 'protein-rich' && (product.nutrition?.protein || 0) < 10) return false;
      }
      return product.stock > 0;
    });
  };

  const calculateValueScore = (product: Product): number => {
    const nutritionScore = (product.nutrition?.protein || 0) * 2 + (product.nutrition?.calories || 0) * 0.01;
    const priceScore = 1000 / product.price;
    return nutritionScore + priceScore;
  };

  const generateSmartBasket = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const availableProducts = filterProducts();
    const basket: BasketItem[] = [];
    let remainingBudget = budget;
    const sortedProducts = availableProducts
      .map(product => ({ product, valueScore: calculateValueScore(product) }))
      .sort((a, b) => b.valueScore - a.valueScore);
    for (const { product } of sortedProducts) {
      if (product.price <= remainingBudget) {
        const maxQuantity = Math.min(
          Math.floor(remainingBudget / product.price),
          product.stock,
          3
        );
        if (maxQuantity > 0) {
          basket.push({ product, quantity: maxQuantity });
          remainingBudget -= product.price * maxQuantity;
        }
      }
    }
    setSuggestedBasket(basket);
    setIsGenerating(false);
  };

  const getTotalCost = (): number => suggestedBasket.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const getTotalItems = (): number => suggestedBasket.reduce((total, item) => total + item.quantity, 0);
  const getTotalNutrition = () => suggestedBasket.reduce((acc, item) => {
    const nutrition = item.product.nutrition;
    if (nutrition) {
      acc.protein += nutrition.protein * item.quantity;
      acc.calories += nutrition.calories * item.quantity;
    }
    return acc;
  }, { protein: 0, calories: 0 });
  const getBudgetUtilization = (): number => Math.round((getTotalCost() / budget) * 100);
  const getValueScore = (): number => Math.round(suggestedBasket.reduce((acc, item) => acc + calculateValueScore(item.product) * item.quantity, 0) / 10);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      setSearching(true);
      const response = await axios.get('/api/data/suggest', {
        params: { prompt: searchTerm }
      });
      setSearchResults(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by prompt..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition"
          >
            <Search className="inline-block mr-2" size={18} /> Search
          </button>
        </div>

        {searching && <p className="text-gray-500">🔍 Searching...</p>}

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {searchResults.map((product, idx) => (
              <motion.div
                key={idx}
                className="bg-white/90 rounded-xl shadow-md overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img src={product.image} alt={product.product_name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.product_name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.short_description}</p>
                  <p className="font-bold text-green-600">₹{product.final_price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="px-3 py-2 rounded-lg border">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select value={dietaryFilter} onChange={(e) => setDietaryFilter(e.target.value)} className="px-3 py-2 rounded-lg border">
              {dietaryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="px-3 py-2 rounded-lg border w-32" placeholder="Budget ₹" />
            <button
              onClick={generateSmartBasket}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Basket'}
            </button>
          </div>
        </div>

        {suggestedBasket.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedBasket.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow border">
                <h4 className="text-lg font-semibold mb-2">{item.product.name}</h4>
                <p className="text-sm text-gray-600 mb-1">₹{item.product.price} x {item.quantity}</p>
                <p className="text-sm text-gray-500">Protein: {item.product.nutrition?.protein}g | Calories: {item.product.nutrition?.calories}</p>
              </div>
            ))}
          </div>
        )}

        {suggestedBasket.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-2">Basket Summary</h3>
            <p>Total Cost: ₹{getTotalCost()}</p>
            <p>Total Items: {getTotalItems()}</p>
            <p>Protein: {getTotalNutrition().protein}g</p>
            <p>Calories: {getTotalNutrition().calories}</p>
            <p>Budget Utilization: {getBudgetUtilization()}%</p>
            <p>Value Score: {getValueScore()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBasket;
