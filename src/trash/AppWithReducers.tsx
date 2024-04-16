import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodoListList/TodoList/Todolist';
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
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
} from "../features/TodoListList/todolists-reducer";
import {
  addTaskAC, changeTaskTitleAC,
  removeTaskAC, tasksReducer, updateTaskAC
} from "../features/TodoListList/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function AppWithReducers() {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0
    },
  ]);

  let [tasksObj, dispatchToTasksObjReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      {
        id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
        todoListId: todoListId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "JS", status: TaskStatuses.Completed,
        todoListId: todoListId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "ReactJS", status: TaskStatuses.New,
        todoListId: todoListId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Rest API", status: TaskStatuses.New,
        todoListId: todoListId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "GraphQL", status: TaskStatuses.New,
        todoListId: todoListId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
    [todoListId2]: [
      {
        id: v1(), title: "Milk", status: TaskStatuses.Completed,
        todoListId: todoListId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Tea", status: TaskStatuses.Completed,
        todoListId: todoListId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Water", status: TaskStatuses.New,
        todoListId: todoListId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Book", status: TaskStatuses.New,
        todoListId: todoListId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: "Paper", status: TaskStatuses.New,
        todoListId: todoListId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ]
  });

  function removeTask(taskId: string, todoListId: string) {
    const action = removeTaskAC(taskId, todoListId);
    dispatchToTasksObjReducer(action)
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskAC({
      todoListId: todoListId,
      title: title,
      status: TaskStatuses.New,
      addedDate: '',
      order: 0,
      priority: TaskPriorities.low,
      description: '',
      deadline: '',
      startDate: '',
      id: 'testId'
    });
    dispatchToTasksObjReducer(action)
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
    const action = updateTaskAC(taskId, {status}, todoListId);
    dispatchToTasksObjReducer(action)
  }

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    const action = updateTaskAC(taskId, {title: newTitle}, todoListId);
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
    const action = addTodolistAC({
      id: v1(),
      title: title,
      addedDate: '',
      order: 0
    });
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

