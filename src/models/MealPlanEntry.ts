import { Schema, model, Document } from 'mongoose';

export interface IMealPlanEntry extends Document {
    date: Date;
    recipeId: Schema.Types.ObjectId;
    mealType?: string;
}

const mealPlanEntrySchema = new Schema({
    date: { type: Date, required: true },
    recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    mealType: { type: String },
});

export default model<IMealPlanEntry>('MealPlanEntry', mealPlanEntrySchema);
