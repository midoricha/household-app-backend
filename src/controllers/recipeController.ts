import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import PantryItem from '../models/PantryItem';
import GroceryListItem from '../models/GroceryListItem';

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const { title, ingredients, instructions, cuisine } = req.body;
  const newRecipe = new Recipe({
    title,
    ingredients,
    instructions,
    cuisine,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addMissingIngredientsToGroceryList = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const pantryItems = await PantryItem.find();
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());

    const missingIngredients = recipe.ingredients.filter(ingredient => {
      return !pantryItemNames.includes(ingredient.name.toLowerCase());
    });

    for (const ingredient of missingIngredients) {
      const groceryListItem = new GroceryListItem({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      });
      await groceryListItem.save();
    }

    res.json({ message: 'Missing ingredients added to grocery list' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
