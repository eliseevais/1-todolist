import React, {ChangeEvent} from 'react';
import {FilterValueType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
  changeFilter: (value: FilterValueType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  children?: React.ReactNode;
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
}

export const Todolist: React.FC<PropsType> = ({children, ...props}) => {
  const [listRef] = useAutoAnimate<HTMLUListElement>();
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
        <button onClick={removeTodolist}>✖</button>
      </h3>
      <AddItemForm addItem={addTaskWrapper}/>

      <ul ref={listRef}>
        {props.tasks.map((task: TaskType) => {
          const onRemoveTaskHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox"
                     checked={task.isDone}
                     onChange={onChangeStatusHandler}
              />
              <EditableSpan title={task.title}
                            onChange={onChangeTitleHandler}
              />
              <button onClick={onRemoveTaskHandler}>✖️</button>

            </li>
          )
        })}

      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>

      </div>
      {children}
    </div>
  )
}

