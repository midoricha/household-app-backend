import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  completed: boolean;
  completedBy?: string; // TODO: user
  dueDate?: Date;
  recurring?: 'never' | 'daily' | 'weekly' | 'monthly' | 'weekdays' | 'weekends' | 'biweekly' | 'yearly';
  notes?: string;
  priority: 'none' | 'low' | 'medium' | 'high';
  isArchived: boolean;
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedBy: { type: String },
  dueDate: { type: Date },
  recurring: { type: String, enum: ['never', 'daily', 'weekly', 'monthly', 'weekdays', 'weekends', 'biweekly', 'yearly'], default: 'never' },
  notes: { type: String },
  priority: { type: String, enum: ['none', 'low', 'medium', 'high'], default: 'none' },
  isArchived: { type: Boolean, default: false },
});

export default model<ITask>('Task', taskSchema);
