import axios from 'axios'

export type TaskType = {
  description: string;
  title: string;
  completed?: boolean;
  status: number;
  priority: number;
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

type UpdateTasksModelType = {
  title: string;
  description: string;
  completed?: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string
};

type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
};

type FieldErrorType = {
  error: string
  field: string
};

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "7baa0947-f1d6-498f-bd5d-ed507ad6475a",
  },
});

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTasksModelType) {
    return instance.put<UpdateTasksModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}