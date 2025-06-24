import { Recipe } from '../types/Recipe';

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Butter Chicken",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800",
    cookTime: "45 min",
    prepTime: "20 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Medium",
    category: "Main Course",
    description: "Rich, creamy tomato-based curry with tender chicken pieces marinated in yogurt and spices",
    ingredients: [
      "1 lb boneless chicken, cut into cubes",
      "1 cup plain yogurt",
      "2 tsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1/2 tsp turmeric powder",
      "1 tsp garam masala",
      "2 tbsp butter",
      "1 large onion, finely chopped",
      "1 can (14 oz) crushed tomatoes",
      "1/2 cup heavy cream",
      "2 tbsp tomato paste",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "Salt to taste",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Marinate chicken with yogurt, half the ginger-garlic paste, chili powder, turmeric, and salt for at least 30 minutes.",
      "Heat butter in a large pan over medium-high heat. Cook marinated chicken until golden brown. Remove and set aside.",
      "In the same pan, sauté onions until golden brown. Add remaining ginger-garlic paste and cook for 1 minute.",
      "Add tomato paste, cumin, coriander, and garam masala. Cook for 2 minutes until fragrant.",
      "Add crushed tomatoes and simmer for 10 minutes until sauce thickens.",
      "Return chicken to the pan, add cream, and simmer for 10-15 minutes.",
      "Adjust seasoning and garnish with fresh cilantro before serving."
    ],
    tips: [
      "For best flavor, marinate chicken overnight",
      "Use full-fat cream for richness",
      "Serve with basmati rice or naan bread"
    ],
    nutritionInfo: {
      calories: 420,
      protein: "32g",
      carbs: "12g",
      fat: "28g"
    }
  },
  {
    id: 2,
    title: "Homemade Gulab Jamun",
    image: "https://images.pexels.com/photos/4913468/pexels-photo-4913468.jpeg?auto=compress&cs=tinysrgb&w=800",
    cookTime: "30 min",
    prepTime: "30 min",
    servings: 8,
    rating: 4.9,
    difficulty: "Hard",
    category: "Desserts",
    description: "Soft, syrupy dumplings made from milk solids, fried until golden and soaked in cardamom-scented sugar syrup",
    ingredients: [
      "1 cup milk powder",
      "1/4 cup all-purpose flour",
      "1/4 tsp baking soda",
      "2 tbsp ghee (clarified butter)",
      "1/4 cup milk (approximately)",
      "Oil for deep frying",
      "For syrup:",
      "1 1/2 cups sugar",
      "1 1/2 cups water",
      "4-5 green cardamom pods",
      "1 tsp rose water (optional)"
    ],
    instructions: [
      "Make syrup: Combine sugar, water, and cardamom in a pan. Boil until slightly sticky (1-string consistency). Add rose water and keep warm.",
      "Mix milk powder, flour, and baking soda in a bowl.",
      "Add ghee and mix well. Gradually add milk to form a soft dough. Don't overmix.",
      "Let dough rest for 10 minutes. Divide into small portions and roll into smooth balls.",
      "Heat oil to medium temperature (not too hot). Fry balls slowly, turning frequently until golden brown.",
      "Immediately transfer hot gulab jamuns to warm syrup.",
      "Let them soak for at least 2 hours before serving."
    ],
    tips: [
      "Oil temperature is crucial - too hot will burn outside, leave inside raw",
      "Balls should be smooth without cracks",
      "Serve warm or at room temperature"
    ],
    nutritionInfo: {
      calories: 280,
      protein: "6g",
      carbs: "45g",
      fat: "12g"
    }
  },
  {
    id: 3,
    title: "Spiced Biryani",
    image: "https://images.pexels.com/photos/2336830/pexels-photo-2336830.jpeg?auto=compress&cs=tinysrgb&w=800",
    cookTime: "60 min",
    prepTime: "30 min",
    servings: 6,
    rating: 4.7,
    difficulty: "Hard",
    category: "Main Course",
    description: "Fragrant rice dish layered with aromatic spices, tender meat, and caramelized onions",
    ingredients: [
      "2 cups basmati rice",
      "1 lb mutton or chicken, cut into pieces",
      "1 cup yogurt",
      "2 large onions, thinly sliced",
      "1/4 cup ghee",
      "2 bay leaves",
      "4-5 green cardamom",
      "2 black cardamom",
      "1 cinnamon stick",
      "1 tsp cumin seeds",
      "2 tsp ginger-garlic paste",
      "1 tsp red chili powder",
      "1/2 tsp turmeric",
      "1 tsp garam masala",
      "Saffron soaked in 1/4 cup warm milk",
      "Fresh mint leaves",
      "Salt to taste"
    ],
    instructions: [
      "Soak rice for 30 minutes. Marinate meat with yogurt, ginger-garlic paste, chili powder, turmeric, and salt for 1 hour.",
      "Deep fry onions until golden brown and crispy. Reserve half for garnish.",
      "Cook marinated meat with remaining fried onions until 70% done.",
      "Boil water with whole spices and salt. Add rice and cook until 70% done. Drain.",
      "In a heavy-bottomed pot, layer cooked meat and rice alternately.",
      "Top with remaining fried onions, saffron milk, mint leaves, and dots of ghee.",
      "Cover with aluminum foil, then place lid. Cook on high heat for 3-4 minutes, then reduce to low heat for 45 minutes.",
      "Let it rest for 10 minutes before opening. Gently mix and serve."
    ],
    tips: [
      "Use aged basmati rice for best results",
      "Don't skip the resting time - it's crucial for flavor development",
      "Serve with raita and boiled eggs"
    ],
    nutritionInfo: {
      calories: 520,
      protein: "28g",
      carbs: "65g",
      fat: "18g"
    }
  },
  {
    id: 4,
    title: "Masala Chai",
    image: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=600",
    cookTime: "10 min",
    prepTime: "5 min",
    servings: 2,
    rating: 4.6,
    category: "Beverages",
    description: "Aromatic spiced tea with cardamom, ginger, and warming spices",
    ingredients: [
      "2 cups water",
      "1 cup whole milk",
      "2 tsp black tea leaves or 2 tea bags",
      "2-3 green cardamom pods, crushed",
      "1 inch fresh ginger, grated",
      "2-3 cloves",
      "1 small cinnamon stick",
      "2-3 tsp sugar (adjust to taste)",
      "Pinch of black pepper (optional)"
    ],
    instructions: [
      "In a saucepan, bring water to boil with all the spices (cardamom, ginger, cloves, cinnamon).",
      "Let it boil for 2-3 minutes to release the flavors.",
      "Add tea leaves and boil for another 2 minutes.",
      "Add milk and sugar, bring to a rolling boil.",
      "Reduce heat and simmer for 2-3 minutes until tea reaches desired strength.",
      "Strain into cups and serve hot."
    ],
    tips: [
      "Adjust spices according to your preference",
      "For stronger flavor, crush the spices before adding",
      "Best enjoyed with biscuits or snacks"
    ],
    nutritionInfo: {
      calories: 80,
      protein: "3g",
      carbs: "12g",
      fat: "3g"
    }
  },
  {
    id: 5,
    title: "Crispy Samosa",
    image: "https://images.pexels.com/photos/14611100/pexels-photo-14611100.jpeg?auto=compress&cs=tinysrgb&w=600",
    cookTime: "30 min",
    prepTime: "45 min",
    servings: 6,
    rating: 4.5,
    category: "Snacks",
    description: "Crispy triangular pastries filled with spiced potatoes and peas",
    ingredients: [
      "For dough:",
      "2 cups all-purpose flour",
      "4 tbsp oil",
      "1/2 tsp salt",
      "Water as needed",
      "For filling:",
      "4 large potatoes, boiled and cubed",
      "1/2 cup green peas",
      "2 tsp cumin seeds",
      "1 tsp coriander seeds",
      "2 green chilies, chopped",
      "1 inch ginger, minced",
      "1 tsp garam masala",
      "1/2 tsp turmeric",
      "Salt to taste",
      "Oil for deep frying"
    ],
    instructions: [
      "Make dough: Mix flour, oil, and salt. Add water gradually to form a stiff dough. Rest for 30 minutes.",
      "For filling: Heat oil, add cumin and coriander seeds. Add ginger, green chilies.",
      "Add potatoes, peas, and all spices. Mix well and cook for 5 minutes. Cool completely.",
      "Divide dough into small portions. Roll each into oval shape, cut in half.",
      "Form cone with each half-circle, fill with potato mixture, seal edges with water.",
      "Heat oil to medium-high temperature. Deep fry samosas until golden brown and crispy.",
      "Serve hot with mint chutney or tamarind sauce."
    ],
    tips: [
      "Ensure filling is completely cool before wrapping",
      "Seal edges properly to prevent opening during frying",
      "Maintain medium heat for even cooking"
    ],
    nutritionInfo: {
      calories: 220,
      protein: "5g",
      carbs: "32g",
      fat: "9g"
    }
  },
  {
    id: 6,
    title: "Palak Paneer",
    image: "https://images.pexels.com/photos/4913520/pexels-photo-4913520.jpeg?auto=compress&cs=tinysrgb&w=600",
    cookTime: "25 min",
    prepTime: "15 min",
    servings: 4,
    rating: 4.8,
    category: "Main Course",
    description: "Creamy spinach curry with soft cubes of cottage cheese",
    ingredients: [
      "500g fresh spinach leaves",
      "200g paneer, cubed",
      "2 medium onions, chopped",
      "3-4 garlic cloves",
      "1 inch ginger",
      "2 green chilies",
      "2 medium tomatoes, chopped",
      "1/2 cup heavy cream",
      "2 tbsp ghee or oil",
      "1 tsp cumin seeds",
      "1/2 tsp garam masala",
      "1/2 tsp red chili powder",
      "Salt to taste"
    ],
    instructions: [
      "Blanch spinach in boiling water for 2 minutes. Drain and blend with ginger, garlic, and green chilies to make a smooth puree.",
      "Heat ghee in a pan, lightly fry paneer cubes until golden. Remove and set aside.",
      "In the same pan, add cumin seeds. When they splutter, add onions and sauté until golden.",
      "Add tomatoes and cook until soft and mushy.",
      "Add spinach puree, salt, red chili powder, and garam masala. Cook for 5-7 minutes.",
      "Add cream and paneer cubes. Simmer for 3-4 minutes.",
      "Serve hot with rice or Indian bread."
    ],
    tips: [
      "Don't overcook spinach to retain its vibrant color",
      "Add a pinch of sugar to balance the flavors",
      "Fresh paneer works best for this recipe"
    ],
    nutritionInfo: {
      calories: 280,
      protein: "15g",
      carbs: "12g",
      fat: "20g"
    }
  }
];

export const categories = [
  'All',
  'Main Course',
  'Appetizers',
  'Snacks',
  'Beverages',
  'Breakfast',
  'Desserts'
];

export const getFeaturedRecipes = () => recipes.slice(0, 3);
export const getPopularRecipes = () => recipes.slice(3);
export const getRecipeById = (id: number) => recipes.find(recipe => recipe.id === id);
export const getRecipesByCategory = (category: string) => 
  category === 'All' ? recipes : recipes.filter(recipe => recipe.category === category);