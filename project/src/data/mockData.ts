import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice',
    price: 120,
    category: 'essentials',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 45,
    nutrition: { protein: 7, calories: 130, isVeg: true, isVegan: true },
    spikeData: { percentage: 85, suggestedRestock: 100, timestamp: new Date().toISOString() }
  },
  {
    id: '2',
    name: 'Organic Almonds',
    price: 450,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 12,
    nutrition: { protein: 21, calories: 579, isVeg: true, isVegan: true },
    spikeData: { percentage: 120, suggestedRestock: 50, timestamp: new Date().toISOString() }
  },
  {
    id: '3',
    name: 'Greek Yogurt',
    price: 80,
    category: 'dairy',
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 25,
    nutrition: { protein: 10, calories: 59, isVeg: true, isVegan: false }
  },
  {
    id: '4',
    name: 'Whole Wheat Bread',
    price: 35,
    category: 'essentials',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 30,
    nutrition: { protein: 9, calories: 247, isVeg: true, isVegan: true }
  },
  {
    id: '5',
    name: 'Dark Chocolate Bar',
    price: 150,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 8,
    nutrition: { protein: 8, calories: 546, isVeg: true, isVegan: false },
    spikeData: { percentage: 95, suggestedRestock: 40, timestamp: new Date().toISOString() }
  },
  {
    id: '6',
    name: 'Fresh Bananas',
    price: 40,
    category: 'fruits',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 60,
    nutrition: { protein: 1, calories: 89, isVeg: true, isVegan: true }
  },
  {
    id: '7',
    name: 'Protein Powder',
    price: 2500,
    category: 'supplements',
    image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 15,
    nutrition: { protein: 25, calories: 120, isVeg: true, isVegan: false }
  },
  {
    id: '8',
    name: 'Olive Oil',
    price: 350,
    category: 'essentials',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
    stock: 20,
    nutrition: { protein: 0, calories: 884, isVeg: true, isVegan: true }
  },
  {
    id: '9',
    name: 'Mixed Nuts',
    price: 320,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 18,
    nutrition: { protein: 15, calories: 607, isVeg: true, isVegan: true },
    spikeData: { percentage: 75, suggestedRestock: 30, timestamp: new Date().toISOString() }
  },
  {
    id: '10',
    name: 'Green Tea',
    price: 180,
    category: 'beverages',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300',
    stock: 35,
    nutrition: { protein: 0, calories: 2, isVeg: true, isVegan: true }
  }
];