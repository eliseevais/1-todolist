import {
  TasksActionsType,
  tasksReducer
} from '../features/TodoListList/tasks-reducer';
import {
  TodolistActionsType,
  todolistsReducer
} from '../features/TodoListList/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from "react-redux";

// объединяем reducers с помощью combineReducers,
// мы задаем структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

// непосредственно создаем store
export const store = createStore(rootReducer, applyMiddleware(thunk))

// определить автоматически тип всего объекта-состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// все типы actions для всего app
export type AppActionsType = TodolistActionsType | TasksActionsType;

// типизация dispatch
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

// типизация thunk
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store
