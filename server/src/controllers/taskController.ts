import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    throw err;
  }
}

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, category, priority, dueDate, completed } = req.body;
  const newTask: ITask = new Task({
    title,
    description,
    category,
    priority,
    dueDate,
    completed
  });
  try {
    const task: ITask = await newTask.save();
    res.status(201).json({ task });
  } catch (err) {
    throw err;
  }
}

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, category, priority, dueDate, completed } = req.body;
  try {
    const task: ITask | null = await Task.findByIdAndUpdate(
      { _id: id },
      { title, description, category, priority, dueDate, completed }
    );
    res.status(200).json({ task });
  } catch (err) {
    throw err;
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const task: ITask | null = await Task.findByIdAndDelete(id);
    res.status(200).json({ task });
  } catch (err) {
    throw err;
  }
}