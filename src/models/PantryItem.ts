import { Schema, model, Document } from 'mongoose';

export interface IPantryItem extends Document {
  name: string;
  quantity: number;
  unit?: string;
}

const pantryItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String },
});

export default model<IPantryItem>('PantryItem', pantryItemSchema);
