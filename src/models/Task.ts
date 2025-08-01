import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  completed: boolean;
  completedBy?: string; // TODO: user
  dueDate?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
  notes?: string;
  priority: 'none' | 'low' | 'medium' | 'high';
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedBy: { type: String },
  dueDate: { type: Date },
  recurring: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  notes: { type: String },
  priority: { type: String, enum: ['none', 'low', 'medium', 'high'] },
});

export default model<ITask>('Task', taskSchema);
