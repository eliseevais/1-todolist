import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {useCallback} from "react";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC
} from "../../state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC
} from "../../state/todolists-reducer";
import {FilterValueType, TasksStateType, TodolistType} from "../AppWithRedux";

export const useAppWithRedux = () => {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

  const removeTask = useCallback((taskId: string, todolistId: string) => {
    const action = removeTaskAC(taskId, todolistId);
    dispatch(action)
  }, [dispatch])

  const addTask = useCallback((title: string, todolistId: string) => {
    const action = addTaskAC(title, todolistId);
    dispatch(action)
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatch(action)
  }, [dispatch])

  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatch(action)
  }, [dispatch])

  const changeFilter = useCallback((filter: FilterValueType, id: string) => {
    const action = changeTodolistFilterAC(filter, id);
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((id: string) => {
    const action = removeTodolistAC(id);
    dispatch(action)
  }, [dispatch])

  const changeTodolistTitle = useCallback((id: string, title: string) => {
    const action = changeTodolistTitleAC(id, title);
    dispatch(action);
  }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action)
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