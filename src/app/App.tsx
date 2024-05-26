import React, {useCallback, useEffect} from 'react';
import {TaskType} from "../api/tasks-api";
import './App.css';
import {Menu} from "@mui/icons-material";
import {
  AppBar,
  Button, CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from "@mui/material";
import {TodoListsList} from "../features/TodoListList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";

export type TasksStateType = {
  [key: string]: Array<TaskType>
};

type AppPropsType = {
  demo?: boolean
}

const App = ({demo = false}: AppPropsType) => {

  const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status);
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initializedAppTC())
  }, []);

  const logOutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  if (!isInitialized) {
    return <div style={{
      position: 'fixed',
      top: '45%',
      textAlign: 'center',
      width: '100%'
    }}>
      <CircularProgress/>
    </div>
  }

  return (
    <BrowserRouter>
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
            {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
          </Toolbar>
          {status === 'loading' && <LinearProgress/>}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={'/'} element={<TodoListsList demo={demo}/>}/>
            <Route path={'/login'} element={<Login/>}/>
          </Routes>
        </Container>
      </div>
    </BrowserRouter>

  )
};

export default App;