import {useState} from "react";
import {todolistID01, todolistID02} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";

export function useTasks() {
  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistID01]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID02]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Tea", isDone: false},
      {id: v1(), title: "Water", isDone: false},
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Paper", isDone: false},
    ]
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({...tasksObj});
    }
  }

  function completelyRemoveTaskForTodolist(todolistId: string) {
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  }

  function addStateForNewTodolist(newTodolistId: string) {
    setTasksObj({
      ...tasksObj,
      [newTodolistId]: []
    })
  }

  return {
    tasksObj,
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    completelyRemoveTaskForTodolist,
    addStateForNewTodolist
  }
}