export interface Recipe {
  id: number;
  title: string;
  image: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}