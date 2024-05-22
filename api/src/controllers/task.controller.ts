import { TaskCreateSchema, TaskUpdateSchema } from "@/schemas";
import {
  addNewTask,
  deleteTask,
  getTaskById,
  getUserTasks,
  updateTask,
} from "@/services";
import { Request, Response, NextFunction } from "express";

export const createTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = TaskCreateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }

    const task = await addNewTask(req.body, req?.user?.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id, req?.user?.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const parsedBody = TaskUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }
    const task = await updateTask(id, req?.user?.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const task = await deleteTask(id, req?.user?.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAllTaskHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getUserTasks(req?.user?.id); // TODO: add pagination
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
