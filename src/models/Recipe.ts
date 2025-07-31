import { Schema, model, Document } from 'mongoose';

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  cuisine?: string;
}

const recipeSchema = new Schema({
  title: { type: String, required: true },
  ingredients: [{ type: String }],
  instructions: { type: String, required: true },
  cuisine: { type: String },
});

export default model<IRecipe>('Recipe', recipeSchema);
