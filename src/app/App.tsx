import React from 'react';
import {TaskType} from "../api/tasks-api";
import './App.css';
import {Menu} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from "@mui/material";
import {TodoListsList} from "../features/TodoListList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

const App = () => {

  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

  return (
    <div className="App">
      <ErrorSnackbar/>
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
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed>
        <TodoListsList />
      </Container>
    </div>
  )
};

export default App;