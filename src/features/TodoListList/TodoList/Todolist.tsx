import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Styles} from "../../../app/__styles";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {FilterValueType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todoListId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, todoListId: string) => void;
  children?: React.ReactNode;
  changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void;
  filter: FilterValueType;
  removeTodolist: (todoListId: string) => void;
  changeTodolistTitle: (todoListId: string, newTitle: string) => void;
}

export const Todolist: React.FC<PropsType> = React.memo(({
                                                           children,
                                                           ...props
                                                         }) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTasksTC(props.id))
  }, []);

  const onAllClickHandler = useCallback(
    () => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(
    () => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  };
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }, [props.changeTodolistTitle, props.id]);
  const addTaskWrapper = useCallback((title: string) => {
    props.addTask(title, props.id)
  }, [props.addTask, props.id]);

  let tasksForToDoList = props.tasks;
  if (props.filter === 'active') {
    tasksForToDoList = props.tasks.filter(task => task.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForToDoList = props.tasks.filter(task => task.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskWrapper}/>

      <div>
        {tasksForToDoList.map((task: TaskType) =>
          <Task removeTask={props.removeTask}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
                task={task}
                todoListId={props.id}
                key={task.id}
          />
        )}
      </div>
      <div>
        <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                style={{
                  color: `${Styles.mainColor}`,
                  borderColor: `${Styles.mainColor}`
                }}
        >
          All
        </Button>
        <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                style={{
                  color: `${Styles.secondary}`,
                  borderColor: `${Styles.secondary}`
                }}
        >
          Active
        </Button>
        <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                style={{
                  color: `${Styles.primary}`,
                  borderColor: `${Styles.primary}`
                }}
        >
          Completed
        </Button>
      </div>
      {children}
    </div>
  )
})

