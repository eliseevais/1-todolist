import {TasksStateType} from "../App/App";
import {Dispatch} from "redux";
import {SetTodolistsActionType} from "./todolists-reducer";
import {tasksAPI, TaskType, UpdateTasksModelType} from "../api/tasks-api";
import {AppRootStateType} from "./store";
import {TodolistType} from "../api/todolists-api";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  task: TaskType
};
export type UpdateTaskActionType = {
  type: 'UPDATE-TASK';
  taskId: string;
  model: UpdateDomainTasksModelType;
  todolistId: string
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  taskId: string;
  newTitle: string;
  todolistId: string
};
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST';
  todolist: TodolistType
};
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
export type SetTasksActionType = {
  type: 'SET-TASKS';
  tasks: Array<TaskType>;
  todolistId: string
};
type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState,
                             action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK' : {
      const stateCopy = {...state};
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state};
      let newTask: TaskType = action.task;
      let tasks = stateCopy[newTask.todolistId];
      let newTasks = [newTask, ...tasks];
      stateCopy[newTask.todolistId] = newTasks;
      return stateCopy
    }
    case 'UPDATE-TASK': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, ...action.model}
          : t);
      state[action.todolistId] = newTasksArray
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, title: action.newTitle}
          : t);
      state[action.todolistId] = newTasksArray
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      const stateCopy = {...state};
      stateCopy[action.todolist.id] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy
    }
    case 'SET-TODOLISTS': {
      const stateCopy = {...state};
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = [];
      })
      return stateCopy
    }
    case 'SET-TASKS': {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    default:
      return state
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task}
};
export const updateTaskAC = (taskId: string, model: UpdateDomainTasksModelType,
                             todolistId: string): UpdateTaskActionType => {
  return {type: 'UPDATE-TASK', taskId, model, todolistId}
};
export const changeTaskTitleAC = (taskId: string, newTitle: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId}
};
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
  return {type: 'SET-TASKS', tasks, todolistId}
};
// thunk - совокупность множества диспатчей.
// dispatch - предназначен для изменения состояния с использованием action
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
      .then(res => {
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todolistId))
      })
  }
};
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
      })
  }
};
export const addTaskTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
      .then(res => {
        const task = res.data.data.item;
        const action = addTaskAC(task);
        dispatch(action)
      })
  }
};

export type UpdateDomainTasksModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string
};
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTasksModelType,
                             todolistId: string) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);

    if (!task) {
      //throw new Error('task not found in the state');
      console.warn('task not found in the state');
      return
    }
    const apiModel: UpdateTasksModelType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel
    }
    tasksAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        const action = updateTaskAC(taskId, domainModel, todolistId);
        dispatch(action)
      })
  }
};
