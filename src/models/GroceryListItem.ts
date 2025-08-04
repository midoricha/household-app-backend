import { Schema, model, Document } from 'mongoose';

export interface IGroceryListItem extends Document {
    name: string;
    quantity?: number;
    unit?: string;
    isChecked: boolean;
}

const groceryListItemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number },
    unit: { type: String },
    isChecked: { type: Boolean, default: false },
});

export default model<IGroceryListItem>('GroceryListItem', groceryListItemSchema);
