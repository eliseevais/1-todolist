import React, {useState} from 'react';
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";
import {FilterValueType, TodolistDomainType} from "../../features/TodoListList/todolists-reducer";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import '../../app/App.css';
import {v1} from "uuid";
import {Menu} from "@mui/icons-material";
import {Todolist} from '../../features/TodoListList/TodoList/Todolist';
import {
  AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography
} from "@mui/material";

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
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: 'JS', status: TaskStatuses.Completed,
        todoListId: todolistId1, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
    [todolistId2]: [
      {
        id: v1(), title: 'Milk', status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
      {
        id: v1(), title: 'Book', status: TaskStatuses.Completed,
        todoListId: todolistId2, startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''
      },
    ],
  });

  function removeTask(id: string, todoListId: string) {
    let todolostsTasks = tasksObj[todoListId]
    tasksObj[todoListId] = todolostsTasks.filter(task => task.id !== id);
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {
      id: v1(), title: title, status: TaskStatuses.New,
      todoListId: todoListId, startDate: '', deadline: '',
      addedDate: '', order: 0, priority: TaskPriorities.low,
      description: ''
    };
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, status: TaskStatuses, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.status = status;
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

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todolist = todolists.find(tl => tl.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function removeTodolist(todoListId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todoListId);
    setTodolists(filteredTodolists);
    delete tasksObj[todoListId];
    setTasksObj({...tasksObj});
  }

  function changeTodolistTitle(todoListId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todoListId);
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

