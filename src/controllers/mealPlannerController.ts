import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import PantryItem from '../models/PantryItem';

export const getMealSuggestions = async (req: Request, res: Response) => {
  try {
    const pantryItems = await PantryItem.find();
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());

    const allRecipes = await Recipe.find();
    
    const suggestions = allRecipes.filter(recipe => {
      // For each recipe, check if any of its ingredients can be matched with the pantry items
      return recipe.ingredients.some(ingredient => {
        const ingredientName = ingredient.name.toLowerCase();
        // Check if any pantry item name is a substring of the ingredient, or vice-versa
        return pantryItemNames.some(pantryItemName => {
          return ingredientName.includes(pantryItemName) || pantryItemName.includes(ingredientName);
        });
      });
    });

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
