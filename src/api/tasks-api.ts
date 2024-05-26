// api
import {ResponseType, instance} from "../utils/instance";

export const tasksAPI = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
  },
  createTask(todoListId: string, taskTitle: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTasksModelType) {
    return instance.put<ResponseType<{item: UpdateTasksModelType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
  }
};

// types
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4
}
export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
type GetTasksResponseType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string | null
};
export type UpdateTasksModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};