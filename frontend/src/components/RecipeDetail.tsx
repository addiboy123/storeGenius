import React from 'react';
import { Clock, Users, Star, ChefHat, ArrowLeft, Timer } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-red-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Recipes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                recipe.difficulty === 'Easy' ? 'bg-green-500' :
                recipe.difficulty === 'Medium' ? 'bg-amber-500' :
                'bg-red-500'
              }`}>
                {recipe.difficulty}
              </span>
              <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-lg text-gray-200">{recipe.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Timer className="h-6 w-6 text-red-700 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Prep Time</p>
                <p className="font-semibold">{recipe.prepTime}</p>
              </div>
              <div className="text-center">
                <Clock className="h-6 w-6 text-red-700 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Cook Time</p>
                <p className="font-semibold">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <Users className="h-6 w-6 text-red-700 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Servings</p>
                <p className="font-semibold">{recipe.servings}</p>
              </div>
              <div className="text-center">
                <Star className="h-6 w-6 text-amber-400 fill-current mx-auto mb-2" />
                <p className="text-sm text-gray-600">Rating</p>
                <p className="font-semibold">{recipe.rating}/5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <ChefHat className="h-6 w-6 text-red-700 mr-2" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-700 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              {recipe.nutritionInfo && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Nutrition (per serving)</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Calories:</span>
                      <span className="font-medium ml-1">{recipe.nutritionInfo.calories}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Protein:</span>
                      <span className="font-medium ml-1">{recipe.nutritionInfo.protein}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Carbs:</span>
                      <span className="font-medium ml-1">{recipe.nutritionInfo.carbs}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Fat:</span>
                      <span className="font-medium ml-1">{recipe.nutritionInfo.fat}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-700 text-white rounded-full text-sm font-semibold mr-4 flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
              
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-3">Chef's Tips</h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="text-amber-700 text-sm flex items-start">
                        <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};