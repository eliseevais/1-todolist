import React, {useState} from 'react';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {FilterValueType, TodolistDomainType} from "../state/todolists-reducer";
import '../App.css';
import {Todolist} from '../Todolist';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {AddItemForm} from "../AddItemForm";
import {v1} from "uuid";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {
      id: todolistId1, title: 'What to learn', filter: 'all',
      addedDate: '', order: 0
    },
    {
      id: todolistId2, title: 'What to buy', filter: 'all',
      addedDate: '', order: 0
    },

  ]);

  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
        todolistId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.Completed,
        todolistId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
    [todolistId2]: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.Completed,
        todolistId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: 'Book', status: TaskStatuses.Completed,
        todolistId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    let todolostsTasks = tasksObj[todolistId]
    tasksObj[todolistId] = todolostsTasks.filter(task => task.id !== id);
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(), title: title, status: TaskStatuses.New,
      todolistId: todolistId, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = status;
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

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function addTodoList(title: string) {
    let todolist: TodolistDomainType = {
      id: v1(), filter: "all", title: title, addedDate: '', order: 0
    }
    setTodolists([todolist, ...todolists]);
    setTasksObj({...tasksObj, [todolist.id]: []})
  }

  // const {
  //   tasksObj,
  //   removeTask,
  //   addTask,
  //   changeTaskStatus,
  //   changeTaskTitle,
  //   completelyRemoveTaskForTodolist,
  //   addStateForNewTodolist
  // } = useTasks();
  //
  // let {
  //   todolists,
  //   changeFilter,
  //   changeTodolistTitle,
  //   removeTodolist,
  //   addTodoList,
  // } = useTodolists(completelyRemoveTaskForTodolist, addStateForNewTodolist)

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large" edge="start" color="inherit"
            aria-label="menu" sx={{mr: 2}}
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
            todolists.map(tl => {
                let tasksForToDoList = tasksObj[tl.id];
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

export default App;

