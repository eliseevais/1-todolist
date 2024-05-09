import {tasksAPI, TaskType, UpdateTasksModelType} from "../../api/tasks-api";
import {TasksStateType} from "../../trash/App/App";
import {AppRootStateType, AppThunk} from "../../app/store";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType
} from "./todolists-reducer";
import {
  AppActionsType,
  setErrorAC,
  setStatusAC
} from "../../app/app-reducer";
import {Dispatch} from "redux";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState,
                             action: TasksActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK' :
      return {
        ...state,
        [action.todoListId]: state[action.todoListId]
          .filter(t => t.id !== action.taskId)
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task,
          ...state[action.task.todoListId]]
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todoListId]: state[action.todoListId]
          .map(t => t.id === action.taskId
            ? {...t, ...action.model}
            : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolist.id]: []}
    case 'REMOVE-TODOLIST':
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy
    case 'SET-TODOLISTS': {
      const stateCopy = {...state};
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = [];
      })
      return stateCopy
    }
    case 'SET-TASKS':
      return {...state, [action.todoListId]: action.tasks}
    default:
      return state
  }
};

// actions
export const removeTaskAC = (taskId: string, todoListId: string) => (
  {type: 'REMOVE-TASK', taskId, todoListId} as const);
export const addTaskAC = (task: TaskType) => (
  {type: 'ADD-TASK', task} as const);
export const updateTaskAC = (taskId: string, model: UpdateDomainTasksModelType,
                             todoListId: string) => (
  {type: 'UPDATE-TASK', taskId, model, todoListId} as const);
export const changeTaskTitleAC = (taskId: string, newTitle: string,
                                  todoListId: string) => (
  {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todoListId} as const);
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => (
  {type: 'SET-TASKS', tasks, todoListId} as const);

// thunks
// совокупность множества dispatch, предназн. для изм. state и исп. action
export const fetchTasksTC = (todoListId: string): AppThunk => (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
  dispatch(setStatusAC('loading'));
  tasksAPI.getTasks(todoListId)
    .then(res => {
      const tasks = res.data.items
      dispatch(setTasksAC(tasks, todoListId));
      dispatch(setStatusAC('succeeded'));
    })
};
export const removeTaskTC = (taskId: string, todoListId: string): AppThunk =>
  (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    dispatch(setStatusAC('loading'));
    tasksAPI.deleteTask(todoListId, taskId)
      .then(res => {
        dispatch(removeTaskAC(taskId, todoListId));
        dispatch(setStatusAC('succeeded'));
      })
  };
export const addTaskTC = (title: string, todoListId: string): AppThunk =>
  (dispatch: Dispatch<TasksActionsType | AppActionsType>) => {
    dispatch(setStatusAC('loading'));
    tasksAPI.createTask(todoListId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item;
          dispatch(addTaskAC(task));
          dispatch(setStatusAC('succeeded'))
        } else {
          if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0]))
          } else {
            dispatch(setErrorAC('some error occurred'))
          }
          dispatch(setStatusAC('failed'))
        }
      })
  };
export const updateTaskTC = (taskId: string,
                             domainModel: UpdateDomainTasksModelType,
                             todoListId: string): AppThunk => {
  return (dispatch: Dispatch<TasksActionsType | AppActionsType>, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todoListId].find(t => t.id === taskId);

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

    dispatch(setStatusAC('loading'));
    tasksAPI.updateTask(todoListId, taskId, apiModel)
      .then(res => {
        dispatch(updateTaskAC(taskId, domainModel, todoListId));
        dispatch(setStatusAC('succeeded'))
      })
  }
};

// types
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;
type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType;

export type UpdateDomainTasksModelType = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
  deadline?: string
};
