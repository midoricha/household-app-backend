import { Request, Response } from 'express';
import MealPlanEntry from '../models/MealPlanEntry';
import Recipe from '../models/Recipe';
import PantryItem from '../models/PantryItem';
import Fuse from 'fuse.js';

export const getMealPlan = async (req: Request, res: Response) => {
  const { date } = req.query;

  try {
    const mealPlan = await MealPlanEntry.find({
      date: date,
    }).populate('recipeId');
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addRecipeToMealPlan = async (req: Request, res: Response) => {
  const { date, recipeId, mealType } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const pantryItems = await PantryItem.find();
    const fuse = new Fuse(pantryItems, { keys: ['name'], includeScore: true, threshold: 0.6 });

    const missing: any[] = [];
    const needsConfirmation: any[] = [];

    for (const ingredient of recipe.ingredients) {
      const result = fuse.search(ingredient.name);
      if (result.length === 0) {
        missing.push(ingredient);
      } else if (result[0].score === 0) {
        // Exact match, do nothing
      } else {
        needsConfirmation.push({
          ingredient: ingredient,
          potentialMatches: result.map(r => r.item),
        });
      }
    }

    const newMealPlanEntry = new MealPlanEntry({
      date,
      recipeId,
      mealType,
    });

    await newMealPlanEntry.save();

    res.status(201).json({
      mealPlanEntry: newMealPlanEntry,
      missing,
      needsConfirmation,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeMealFromPlan = async (req: Request, res: Response) => {
  try {
    await MealPlanEntry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meal plan entry deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
