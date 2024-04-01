import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
  AppBar,
  Button, Container, Grid,
  IconButton, Paper,
  Toolbar,
  Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC,
  todolistsReducer, removeTodolistAC, FilterValueType
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC, tasksReducer
} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/tasks-api";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0
    },
  ]);

  let [tasksObj, dispatchToTasksObjReducer] = useReducer(tasksReducer, {
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
        id: v1(), title: "ReactJS", status: TaskStatuses.New,
        todolistId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Rest API", status: TaskStatuses.New,
        todolistId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "GraphQL", status: TaskStatuses.New,
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
        id: v1(), title: "Water", status: TaskStatuses.New,
        todolistId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Book", status: TaskStatuses.New,
        todolistId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Paper", status: TaskStatuses.New,
        todolistId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ]
  });

  function removeTask(taskId: string, todolistId: string) {
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    const action = changeTaskStatusAC(taskId, status, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatchToTasksObjReducer(action)
  }

  function changeFilter(filter: FilterValueType, id: string) {
    const action = changeTodolistFilterAC(filter, id);
    dispatchToTodolistsReducer(action)
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTasksObjReducer(action);
    dispatchToTodolistsReducer(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToTodolistsReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title);
    dispatchToTasksObjReducer(action);
    dispatchToTodolistsReducer(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={10}>
          {
            todolists.map((tl) => {
                let allTodolistTasks = tasksObj[tl.id]
                let tasksForToDoList = allTodolistTasks;

                if (tl.filter === 'active') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.New)
                }
                if (tl.filter === 'completed') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.status === TaskStatuses.Completed)
                }

                return <Grid item>
                  <Paper style={{padding: '10px'}}>
                    <Todolist key={tl.id}
                              id={tl.id}
                              title={tl.title}
                              tasks={tasksForToDoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                              changeTodolistTitle={changeTodolistTitle}
                    >
                    </Todolist>
                  </Paper>
                </Grid>
              }
            )
          }
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithReducers;

