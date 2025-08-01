import { Schema, model, Document } from 'mongoose';

// New interface for an ingredient
export interface IIngredient {
  name: string;
  quantity?: number;
  unit?: string;
}

export interface IRecipe extends Document {
  title: string;
  ingredients: IIngredient[];
  instructions: string[];
  cuisine?: string;
}

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number },
  unit: { type: String },
});

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: [{ type: String, required: true }],
  cuisine: { type: String },
});

export default model<IRecipe>('Recipe', recipeSchema);
