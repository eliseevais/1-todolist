import {useState} from "react";
import {todolistId01, todolistId02} from "../id-utils";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../../api/tasks-api";
import {todolistId1, todolistId2} from "../../../features/TodoListList/todolists-reducer";
import {TasksStateType} from "../../../app/App";

export function useTasks() {
  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId01]: [
      {
        id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "JS", status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Rest API", status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "GraphQL", status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
    [todolistId02]: [
      {
        id: v1(), title: "Milk", status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Tea", status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Water", status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Book", status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Paper", status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ]
  });

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {id: v1(), title: title,status: TaskStatuses.New,
      todoListId: todolistId1, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''};
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = TaskStatuses.New;
      setTasksObj({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({...tasksObj});
    }
  }

  function completelyRemoveTaskForTodolist(todoListId: string) {
    delete tasksObj[todoListId];
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