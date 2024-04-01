import {TasksStateType} from "../App/App";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  taskId: string;
  todolistId: string
};
export type AddTaskActionType = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string
};
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  taskId: string;
  status: TaskStatuses;
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
  title: string;
  todolistId: string
};
export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST';
  id: string
};
type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {
  [todolistId1]: [
    {
      id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "JS", status: TaskStatuses.Completed,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "Rest API", status: TaskStatuses.Completed,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "GraphQL", status: TaskStatuses.Completed,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
  ],
  [todolistId2]: [
    {
      id: v1(), title: "Milk", status: TaskStatuses.Completed,
      todolistId: todolistId2, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "Tea", status: TaskStatuses.Completed,
      todolistId: todolistId2, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "Water", status: TaskStatuses.Completed,
      todolistId: todolistId2, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "Book", status: TaskStatuses.Completed,
      todolistId: todolistId2, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
    {
      id: v1(), title: "Paper", status: TaskStatuses.Completed,
      todolistId: todolistId2, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    },
  ]
}

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
      let newTask = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        todolistId: action.todolistId,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      };
      let tasks = stateCopy[action.todolistId];
      let newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, status: action.status}
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
      stateCopy[action.todolistId] = [];
      return stateCopy
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
};

export const removeTaskAC = (taskId: string,
                             todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todolistId}
};
export const changeTaskStatusAC = (taskId: string,
                                   status: TaskStatuses,
                                   todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS', taskId, status, todolistId
  }
};
export const changeTaskTitleAC = (taskId: string,
                                  newTitle: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId
  }
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
};
export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
}