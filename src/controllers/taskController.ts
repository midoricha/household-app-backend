import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ isArchived: false });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, completed, completedBy, dueDate, recurring, notes, priority } = req.body;
  const newTask = new Task({
    title,
    completed,
    completedBy,
    dueDate,
    recurring,
    notes,
    priority
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (completed) {
      if (task.recurring && task.recurring !== 'never' && task.dueDate) {
        const newDueDate = new Date(task.dueDate);
        switch (task.recurring) {
          case 'daily':
            newDueDate.setDate(newDueDate.getDate() + 1);
            break;
          case 'weekly':
            newDueDate.setDate(newDueDate.getDate() + 7);
            break;
          case 'biweekly':
            newDueDate.setDate(newDueDate.getDate() + 14);
            break;
          case 'monthly':
            newDueDate.setMonth(newDueDate.getMonth() + 1);
            break;
          case 'yearly':
            newDueDate.setFullYear(newDueDate.getFullYear() + 1);
            break;
          case 'weekdays':
            do {
              newDueDate.setDate(newDueDate.getDate() + 1);
            } while (newDueDate.getDay() === 0 || newDueDate.getDay() === 6);
            break;
          case 'weekends':
            do {
              newDueDate.setDate(newDueDate.getDate() + 1);
            } while (newDueDate.getDay() !== 0 && newDueDate.getDay() !== 6);
            break;
        }
        task.dueDate = newDueDate;
      } else {
        task.completed = true;
        task.isArchived = true;
      }
    } else {
      // If the task is being marked as not completed, update other fields
      const { title, completedBy, dueDate, recurring, notes, priority } = req.body;
      task.title = title ?? task.title;
      task.completed = completed ?? task.completed;
      task.completedBy = completedBy ?? task.completedBy;
      task.dueDate = dueDate ?? task.dueDate;
      task.recurring = recurring ?? task.recurring;
      task.notes = notes ?? task.notes;
      task.priority = priority ?? task.priority;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getArchivedTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ isArchived: true });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
