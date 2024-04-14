import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {useCallback} from "react";
import {
  addTaskTC,
  updateTaskTC, removeTaskTC
} from "../../state/tasks-reducer";
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterValueType,
  removeTodolistTC,
  TodolistDomainType
} from "../../state/todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskStatuses} from "../../api/tasks-api";

export const useAppWithRedux = () => {
  const dispatch = useAppDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
  const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    const thunk = removeTaskTC(taskId, todolistId);
    dispatch(thunk)
  }, [])

  const addTask = useCallback((title: string, todolistId: string) => {
    const thunk = addTaskTC(title, todolistId);
    dispatch(thunk)
  }, [])

  const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    const thunk = updateTaskTC(taskId, {status: status}, todolistId);
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId);
    dispatch(thunk)
  }, [])

  const changeFilter = useCallback((filter: FilterValueType, id: string) => {
    const action = changeTodolistFilterAC(filter, id);
    dispatch(action)
  }, [])

  const removeTodolist = useCallback((id: string) => {
    const thunk = removeTodolistTC(id);
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
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