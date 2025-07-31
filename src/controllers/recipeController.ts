import { Request, Response } from 'express';
import Recipe from '../models/Recipe';

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
