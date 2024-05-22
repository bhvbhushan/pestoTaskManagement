import prisma from "@/prisma";
import {
  TaskCreateInput,
  TaskResponseSchema,
  TaskUpdateInput,
} from "@/schemas";

//Adding New Task
export const addNewTask = async (payload: TaskCreateInput, userId) => {
  const task = await prisma.tasks.create({
    data: {
      ...payload,
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      dueDate: true,
      status: true,
    },
  });
  return TaskResponseSchema.parse(task);
};

//Getting Task by Id
export const getTaskById = async (id: string, userId: string) => {
  const task = await prisma.tasks.findUnique({
    where: {
      id,
      userId,
    },
  });
  return TaskResponseSchema.parse(task);
};

//Updating Task
export const updateTask = async (
  id: string,
  userId: string,
  payload: TaskUpdateInput
) => {
  const task = await prisma.tasks.update({
    where: { id, userId },
    data: { ...payload },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      dueDate: true,
      status: true,
    },
  });
  return TaskResponseSchema.parse(task);
};

//Deleting a Task
export const deleteTask = async (id: string, userId: string) => {
  const task = await prisma.tasks.delete({ where: { id, userId } });
  return task;
};
