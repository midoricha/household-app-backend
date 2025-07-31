import { Request, Response } from 'express';
import PantryItem from '../models/PantryItem';

export const getPantryItems = async (req: Request, res: Response) => {
  try {
    const items = await PantryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createPantryItem = async (req: Request, res: Response) => {
  const { name, quantity, unit } = req.body;
  const newItem = new PantryItem({
    name,
    quantity,
    unit,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updatePantryItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await PantryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Pantry item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deletePantryItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await PantryItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Pantry item not found' });
    res.json({ message: 'Pantry item deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
