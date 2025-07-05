// components/ProductModal.tsx
import React from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { name, image, category, price, stock, spikeData } = product;
  const revenueImpact = (spikeData?.suggestedRestock || 0) * price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row overflow-hidden rounded-xl">
          <img src={image} alt={name} className="w-full md:w-1/2 h-64 object-cover" />
          <div className="p-6 flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
            <p className="text-sm text-gray-500 mb-2">{category.toUpperCase()}</p>
            <p className="text-lg font-semibold text-green-700 mb-4">₹{price.toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Current Stock</p>
                <p className="text-lg font-bold">{stock}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500">Suggested Restock</p>
                <p className="text-lg font-bold text-blue-600">{spikeData?.suggestedRestock}</p>
              </div>
              <div>
                <p className="text-xs text-yellow-500">Spike Percentage</p>
                <p className="text-lg font-bold text-yellow-600">+{spikeData?.percentage}%</p>
              </div>
              <div>
                <p className="text-xs text-green-600">Revenue Impact</p>
                <p className="text-lg font-bold text-green-700">₹{revenueImpact.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(spikeData?.timestamp || '').toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {new Date(spikeData?.timestamp || '').toLocaleTimeString()}
              </div>
            </div>

            {/* Optional: Placeholder for future chart */}
            <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600 text-center">
              📈 Spike trend chart coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
