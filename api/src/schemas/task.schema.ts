import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { TaskStatus } from "@prisma/client";

extendZodWithOpenApi(z);

export const TaskCreateSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    dueDate: z.string().pipe(z.coerce.date()).optional(),
  })
  .openapi("TaskCreateInput");

export type TaskCreateInput = z.infer<typeof TaskCreateSchema>;

export const TaskUpdateSchema = TaskCreateSchema.extend({
  status: z.nativeEnum(TaskStatus),
})
  .partial()
  .openapi("TaskUpdateSchema");

export type TaskUpdateInput = z.infer<typeof TaskUpdateSchema>;

export const TaskResponseSchema = TaskUpdateSchema.extend({
  id: z.string(),
  createdAt: z.string().pipe(z.coerce.date()),
  updatedAt: z.string().pipe(z.coerce.date()),
}).openapi("TaskResponse");
export type TaskResponse = z.infer<typeof TaskResponseSchema>;

export const TasksResponseSchema = z
  .array(TaskResponseSchema)
  .openapi("TasksResponse");
