export interface User {
  id: string;
  fullName: string;
  username: string;
  role: 'Customer' | 'Staff';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  nutrition?: {
    protein: number;
    calories: number;
    isVeg: boolean;
    isVegan: boolean;
  };
  spikeData?: {
    percentage: number;
    suggestedRestock: number;
    timestamp: string;
  };
}

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  fullName: string;
  username: string;
  password: string;
  email:string,
  confirmPassword: string;
  role: 'Customer' | 'Staff';
}