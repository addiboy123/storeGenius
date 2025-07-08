import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Search, User, Trash2, Leaf, Droplets, TreePine , LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { GoogleGenAI } from '@google/genai';

// Gemini instance

const ai = new GoogleGenAI({
  apiKey:import.meta.env.VITE_GEMINI_API
});

// Types
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
  environment?: {
    carbon_footprint?: number; // kg CO₂e
    water_usage?: number;      // Liters
    land_usage?: number;       // m²
  };
};

type BasketItem = {
  product: Product;
  quantity: number;
};

// Gemini fetch function
const fetchEnvironmentalData = async (productName: string) => {
  const prompt = `
You are an environmental data assistant. Provide estimated environmental impact for the product "${productName}" in the following JSON format:

{
  "carbon_footprint": number (in kg CO2e),
  "water_usage": number (in liters),
  "land_usage": number (in m2)
}

Only respond with valid JSON. Do not include markdown or explanations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let text = response.text;
    text = text.trim().replace(/^```json\s*|```$/g, "");
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error("Failed to get environmental data:", err);
    return null;
  }
};

const SmartBasket: React.FC = () => {
  const { user,logout } = useAuth();
  const [budget, setBudget] = useState<number>(500);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState<'search' | 'profile'>('search');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      setSearching(true);
      const response = await axios.get('/api/data/suggest', {
        params: { prompt: searchTerm },
      });

      const results: Product[] = response.data;

      // Fetch environmental data for each product
      const enrichedResults: Product[] = await Promise.all(
        results.map(async (product) => {
          const env = await fetchEnvironmentalData(product.product_name);
          return { ...product, environment: env || {} };
        })
      );

      setSearchResults(enrichedResults);
      setBasket(enrichedResults.map(product => ({ product, quantity: 1 })));

      // Evaluate overall impact
      const impact = getEnvironmentalImpact(enrichedResults.map(p => ({ product: p, quantity: 1 })));
      if (impact.carbon > 50 || impact.water > 2000 || impact.land > 10) {
        setPopupMessage("⚠️ High environmental impact! Consider removing some items.");
      } else if (impact.carbon > 20 || impact.water > 1000 || impact.land > 5) {
        setPopupMessage("♻️ Moderate environmental impact.");
      } else {
        setPopupMessage("✅ Low environmental impact. Good choices!");
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);

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

  const getEnvironmentalImpact = (items: BasketItem[] = basket) =>
    items.reduce(
      (acc, item) => {
        acc.carbon += (item.product.environment?.carbon_footprint || 0) * item.quantity;
        acc.water += (item.product.environment?.water_usage || 0) * item.quantity;
        acc.land += (item.product.environment?.land_usage || 0) * item.quantity;
        return acc;
      },
      { carbon: 0, water: 0, land: 0 }
    );

  const removeItem = (id: string) => {
    setBasket(prev => prev.filter(item => item.product._id !== id));
  };

  const impact = getEnvironmentalImpact();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">SmartBasket 🛒</h1>
        <div className="flex gap-4">
          <button onClick={() => setView('search')} className="hover:text-green-600">Search</button>
          <button onClick={() => setView('profile')} className="hover:text-green-600">Profile</button>
        </div>
      </nav>

      {/* Popup */}
      {showPopup && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg border border-green-300 rounded-lg px-6 py-3 text-sm text-green-800 font-medium">
          {popupMessage}
        </div>
      )}

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

            {searching && <p className="text-gray-600 mb-4">🔍 Searching and enriching with environmental data...</p>}

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

                {/* Environmental Impact */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-lg font-semibold mb-2">🌍 Environmental Impact</h4>
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Leaf className="text-green-600" /> <span>Carbon Footprint:</span> <b>{impact.carbon.toFixed(2)} kg CO₂e</b>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="text-blue-500" /> <span>Water Usage:</span> <b>{impact.water.toFixed(2)} L</b>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="text-green-800" /> <span>Land Usage:</span> <b>{impact.land.toFixed(2)} m²</b>
                    </div>
                  </div>
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
            <div className='flex justify-between'>

            <p><span className="font-semibold">Name:</span> {user?.fullName || 'Guest'}</p>
            <button
                        onClick={logout}
                        className="flex items-center text-sm px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                      >
                        <LogOut size={16} className="mr-1" /> Logout
                      </button>
            </div>
            <p><span className="font-semibold">Budget:</span> ₹{budget}</p>
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold mb-2">🧺 Basket Summary</h3>
              <p>Total Cost: ₹{getTotalCost()}</p>
              <p>Total Items: {getTotalItems()}</p>
              <p>Protein: {getNutrition().protein}g</p>
              <p>Calories: {getNutrition().calories}</p>

              <div className="mt-4 pt-4 border-t">
                <h4 className="text-lg font-semibold mb-2">🌱 Environmental Impact</h4>
                <p>Carbon: {impact.carbon.toFixed(2)} kg CO₂e</p>
                <p>Water: {impact.water.toFixed(2)} liters</p>
                <p>Land: {impact.land.toFixed(2)} m²</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBasket;
