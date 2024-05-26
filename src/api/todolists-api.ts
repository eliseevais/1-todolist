import {ResponseType, instance} from "../utils/instance";

// api
export const todolistsAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(
      `todo-lists`, {title: title})
  },
  deleteTodolist(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
  },
  updateTodolist(todoListId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoListId}`,
      {title: title})
  }
};

// types
export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
};