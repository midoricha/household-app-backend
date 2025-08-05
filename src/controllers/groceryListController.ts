import { Request, Response } from 'express';
import GroceryListItem, { IGroceryListItem } from '../models/GroceryListItem';
import PantryItem from '../models/PantryItem';

export const getGroceryListItems = async (req: Request, res: Response) => {
    try {
        const items = await GroceryListItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const createGroceryListItem = async (req: Request, res: Response) => {
    const { name, quantity, unit } = req.body;
    const newItem = new GroceryListItem({
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

export const updateGroceryListItem = async (req: Request, res: Response) => {
    try {
        const updatedItem = await GroceryListItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};

export const deleteGroceryListItem = async (req: Request, res: Response) => {
    try {
        await GroceryListItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const moveCheckedItemsToPantry = async (req: Request, res: Response) => {
    try {
        const checkedItems = await GroceryListItem.find({ isChecked: true });

        for (const item of checkedItems) {
            const pantryItem = new PantryItem({
                name: item.name,
                quantity: item.quantity,
                unit: item.unit,
            });
            await pantryItem.save();
            await item.deleteOne();
        }

        res.json({ message: 'Checked items moved to pantry' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const batchAddGroceryListItems = async (req: Request, res: Response) => {
    const { items } = req.body as { items: IGroceryListItem[] };

    try {
        for (const item of items) {
            const existingItem = await GroceryListItem.findOne({
                name: { $regex: new RegExp(`^${item.name}$`, 'i') }
            });

            if (!existingItem) {
                const newItem = new GroceryListItem(item);
                await newItem.save();
            }
        }
        res.status(201).json({ message: 'Batch add successful' });
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
};
