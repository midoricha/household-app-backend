import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import PantryItem from '../models/PantryItem';

export const getMealSuggestions = async (req: Request, res: Response) => {
  try {
    const pantryItems = await PantryItem.find();
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());

    const allRecipes = await Recipe.find();
    
    const suggestions = allRecipes.filter(recipe => {
      return recipe.ingredients.some(ingredient => pantryItemNames.includes(ingredient.toLowerCase()));
    });

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
