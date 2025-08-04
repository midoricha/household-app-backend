import { Request, Response } from 'express';
import MealPlanEntry from '../models/MealPlanEntry';
import Recipe from '../models/Recipe';
import PantryItem from '../models/PantryItem';

export const getMealPlan = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    const mealPlan = await MealPlanEntry.find({
      date: {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      },
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
    const pantryItemNames = pantryItems.map(item => item.name.toLowerCase());

    const missingIngredients = recipe.ingredients.filter(ingredient => {
      return !pantryItemNames.includes(ingredient.name.toLowerCase());
    });

    const newMealPlanEntry = new MealPlanEntry({
      date,
      recipeId,
      mealType,
    });

    await newMealPlanEntry.save();

    res.status(201).json({
      mealPlanEntry: newMealPlanEntry,
      missingIngredients,
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
