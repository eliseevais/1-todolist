import {useState} from "react";
import {todolistId01, todolistId02} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {todolistId1, todolistId2} from "../../state/todolists-reducer";

export function useTasks() {
  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId01]: [
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
    [todolistId02]: [
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
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(), title: title,status: TaskStatuses.New,
      todolistId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''};
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = TaskStatuses.New;
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

  function addStateForNewTodolist(newtodolistId: string) {
    setTasksObj({
      ...tasksObj,
      [newtodolistId]: []
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