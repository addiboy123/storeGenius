import React from 'react';
import { Clock, Users, Star, Heart } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeClick: (id: number) => void;
  onFavoriteToggle: (id: number) => void;
  isFavorite: boolean;
  variant?: 'featured' | 'grid';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onRecipeClick,
  onFavoriteToggle,
  isFavorite,
  variant = 'grid'
}) => {
  const isFeatured = variant === 'featured';

  return (
    <div 
      className={`group cursor-pointer transform transition-all duration-300 ${
        isFeatured ? 'hover:-translate-y-2' : 'hover:-translate-y-1'
      }`}
      onClick={() => onRecipeClick(recipe.id)}
    >
      <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
        isFeatured ? 'rounded-2xl shadow-lg hover:shadow-2xl' : ''
      }`}>
        <div className="relative overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              isFeatured ? 'h-64 group-hover:scale-110' : 'h-48 group-hover:scale-105'
            }`}
          />
          <div className={`absolute ${isFeatured ? 'top-4 right-4' : 'top-3 right-3'}`}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle(recipe.id);
              }}
              className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200"
            >
              <Heart 
                className={`${isFeatured ? 'h-5 w-5' : 'h-4 w-4'} transition-colors duration-200 ${
                  isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'
                }`}
              />
            </button>
          </div>
          {isFeatured && (
            <div className="absolute bottom-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                recipe.difficulty === 'Easy' ? 'bg-green-500 text-white' :
                recipe.difficulty === 'Medium' ? 'bg-amber-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {recipe.difficulty}
              </span>
            </div>
          )}
        </div>
        
        <div className={isFeatured ? 'p-6' : 'p-5'}>
          {!isFeatured && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full">
                {recipe.category}
              </span>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-amber-400 fill-current" />
                <span className="ml-1 text-xs text-gray-600">{recipe.rating}</span>
              </div>
            </div>
          )}
          
          <h4 className={`font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors duration-200 ${
            isFeatured ? 'text-xl mb-2' : 'text-lg mb-3'
          }`}>
            {recipe.title}
          </h4>
          
          {isFeatured && (
            <p className="text-gray-600 mb-4 leading-relaxed">{recipe.description}</p>
          )}
          
          <div className={`flex items-center justify-between text-sm text-gray-500 ${
            isFeatured ? '' : 'text-sm'
          }`}>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'} mr-1`} />
                {recipe.cookTime}
              </div>
              <div className="flex items-center">
                <Users className={`${isFeatured ? 'h-4 w-4' : 'h-3 w-3'} mr-1`} />
                {isFeatured ? recipe.servings : `${recipe.servings} servings`}
              </div>
            </div>
            {isFeatured && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-700">{recipe.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};