import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";

const initialState: Array<TodolistDomainType> = [];
export let todolistId1 = v1();
export let todolistId2 = v1();

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id
        ? {...tl, title: action.title}
        : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id
        ? {...tl, filter: action.filter}
        : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state
  }
};

// actions
export const removeTodolistAC = (id: string) => (
  {type: 'REMOVE-TODOLIST', id} as const);
export const addTodolistAC = (todolist: TodolistType) => (
  {type: 'ADD-TODOLIST', todolist} as const);
export const changeTodolistTitleAC = (id: string, title: string) => (
  {type: 'CHANGE-TODOLIST-TITLE', id, title} as const);
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) => (
  {type: 'CHANGE-TODOLIST-FILTER', filter, id} as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => (
  {type: 'SET-TODOLISTS', todolists} as const);

// thunks
// совокупность множества dispatch, предназн. для изм. state и исп. action
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  todolistsAPI.getTodolists()
    .then(res => {
      dispatch(setTodolistsAC(res.data))
    })
};
// export const _fetchTodolistsTC = (): AppThunk => async dispatch => {
//   try {
//     const res = await todolistsAPI.getTodolists()
//     dispatch(setTodolistsAC(res.data))
//   } catch(e) {
//     throw new Error(e)
//   }
// };
export const removeTodolistTC = (todoListId: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.deleteTodolist(todoListId)
      .then(res => {
        dispatch(removeTodolistAC(todoListId))
      })
  };
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  todolistsAPI.createTodolist(title)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
      } else {
        console.error(res.data.messages[0])
      }
    })
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then(res => {
        dispatch(changeTodolistTitleAC(id, title))
      })
  };

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;

export type TodolistActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType;

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType
};

