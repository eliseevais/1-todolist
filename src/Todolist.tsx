import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Styles} from "./__styles";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  addTask: (title: string, todolistId: string) => void;
  children?: React.ReactNode;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
}

export const Todolist: React.FC<PropsType> = ({children, ...props}) => {
  // const [listRef] = useAutoAnimate<HTMLUListElement>();
  const [listRef] = useAutoAnimate<HTMLDivElement>();
  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  };
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };
  const addTaskWrapper = (title: string) => {
    props.addTask(title, props.id)
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskWrapper}/>

      <div ref={listRef}>
        {props.tasks.map((task: TaskType) => {
          const onRemoveTaskHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };

          return (
            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
              <Checkbox checked={task.isDone}
                        onChange={onChangeStatusHandler}
                        style={{color: `${Styles.mainColor}`}}
              />
              <EditableSpan title={task.title}
                            onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveTaskHandler}>
                <Delete/>
              </IconButton>


            </div>
          )
        })}

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
}

