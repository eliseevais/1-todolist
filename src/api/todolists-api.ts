import axios from 'axios'

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
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

export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`)
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(
      `todo-lists`, {title: title})
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`,
      {title: title})
  }
}