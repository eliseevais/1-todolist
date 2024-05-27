import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store";
import {useCallback} from "react";
import {
  addTaskTC,
  updateTaskTC, removeTaskTC
} from "../../features/TodoListList/tasks-reducer";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType
} from "../../features/TodoListList/todolists-reducer";
import {TasksStateType} from "../App";
import {TaskStatuses} from "../../api/tasks-api";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists);
  const tasksObj = useSelector<AppRootStateType, TasksStateType>(
    state => state.tasks);

  const removeTask = useCallback(
    (taskId: string, todoListId: string) => {
    const thunk = removeTaskTC(taskId, todoListId);
    dispatch(thunk)
  }, [])

  const addTask = useCallback((title: string, todoListId: string) => {
    const thunk = addTaskTC(title, todoListId);
    dispatch(thunk)
  }, [])

  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todoListId: string) => {
    const thunk = updateTaskTC(taskId, {status: status}, todoListId);
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todoListId: string) => {
    const thunk = updateTaskTC(taskId, {title: newTitle}, todoListId);
    dispatch(thunk)
  }, [])

  const changeFilter = useCallback(
    (filter: FilterValueType, id: string) => {
    const action = changeTodolistFilterAC(filter, id);
    dispatch(action)
  }, [])

  const removeTodolist = useCallback((id: string) => {
    const thunk = removeTodolistTC(id);
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
    const thunk = changeTodolistTitleTC(id, title);
    dispatch(thunk);
  }, [])

  const addTodoList = useCallback((title: string) => {
    const thunk = addTodolistTC(title);
    dispatch(thunk)
  }, [dispatch])

  return {
    tasksObj,
    todolists,
    addTodoList,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    removeTodolist,
    changeTodolistTitle
  }
}