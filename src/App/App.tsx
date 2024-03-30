import React from 'react';
import '../App.css';
import {TaskType, Todolist} from '../Todolist';
import {AddItemForm} from "../AddItemForm";
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
import {useTasks} from "./hooks/useTasks";
import {useTodolists} from "./hooks/useTodolists";

export type FilterValueType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>
};

function App() {

  const {
    tasksObj,
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    completelyRemoveTaskForTodolist,
    addStateForNewTodolist
  } = useTasks();

  let {
    todolists,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    addTodoList,
  } = useTodolists(completelyRemoveTaskForTodolist, addStateForNewTodolist)


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
            todolists.map(tl => {
                let tasksForToDoList = tasksObj[tl.id];
                if (tl.filter === 'active') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
                }
                if (tl.filter === 'completed') {
                  tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
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

