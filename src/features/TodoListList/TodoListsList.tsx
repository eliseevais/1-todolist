import {fetchTodolistsTC, TodolistDomainType} from "./todolists-reducer";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../app/store";
import {useApp} from "../../app/hooks/useApp";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/Todolist";

type TodoListsListPropsType = {
  todoLists?: Array<TodolistDomainType>
}
export const TodoListsList: React.FC<TodoListsListPropsType> = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, []);

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
    changeTodolistTitle,
  } = useApp()

  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodoList}/>
      </Grid>
      <Grid container spacing={10}>
        {
          todolists.map((tl: any) => {
              let allTodolistTasks = tasksObj[tl.id]
              let tasksForToDoList = allTodolistTasks;

              return (
                <Grid item key={tl.id}>
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
                </Grid>)
            }
          )
        }
      </Grid>
    </>
  )
}