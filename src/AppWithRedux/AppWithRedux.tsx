import React from 'react';
import {TaskType} from "../api/tasks-api";
import '../App.css';
import {AddItemForm} from "../AddItemForm";
import {useAppWithRedux} from "./hooks/useAppWithRedux";
import {Todolist} from '../Todolist';
import {
  AppBar, Button, Container, Grid, IconButton, Paper,
  Toolbar, Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

const AppWithRedux = () => {

  const {
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
  } = useAppWithRedux()

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
            todolists.map((tl: any) => {
                let allTodolistTasks = tasksObj[tl.id]
                let tasksForToDoList = allTodolistTasks;

                return <Grid item key={tl.id}>
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

export default AppWithRedux;

