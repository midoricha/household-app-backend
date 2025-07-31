import { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  completed: boolean;
  completedBy?: string;
  dueDate?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedBy: { type: String },
  dueDate: { type: Date },
  recurring: { type: String, enum: ['daily', 'weekly', 'monthly'] },
});

export default model<ITask>('Task', taskSchema);
