import { Schema, model, Document } from 'mongoose';

export interface IPantryItem extends Document {
  name: string;
  quantity?: number;
  unit?: string;
  expiryDate?: Date;
  category?: string;
}

const pantryItemSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number },
  unit: { type: String },
  expiryDate: { type: Date },
  category: { type: String }
});

export default model<IPantryItem>('PantryItem', pantryItemSchema);
