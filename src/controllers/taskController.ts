import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, completedBy, dueDate, recurring } = req.body;
  const newTask = new Task({
    title,
    completedBy,
    dueDate,
    recurring,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
