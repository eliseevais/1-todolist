import React, {
  ChangeEvent,
  KeyboardEvent,
  useState
} from 'react';
import {FilterValueType} from "./App";
import {useAutoAnimate} from "@formkit/auto-animate/react";

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
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (todolistId: string) => void;
}

export const Todolist: React.FC<PropsType> = ({children, ...props}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };
  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.charCode === 13) {
      props.addTask(newTaskTitle, props.id);
      setNewTaskTitle('');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id);
      setNewTaskTitle('');
    } else {
      setError('Field is required')
    }
    ;
  };

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

  // const onClickFilterHandler = (value: FilterValueType) => {
  //   props.changeFilter(value);
  // };

  // const onRemoveTaskHandler = (taskId: string) => {
  //   props.removeTask(taskId, props.id);
  // };

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  return (
    <div>
      <h3>{props.title} <button onClick={removeTodolist}>✖</button></h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />

        <button onClick={addTask}>+</button>
        {/*<Button name={'+'} onClick={onAddTaskHandler}/>*/}
        {error && <div className='error-message'>{error}</div>}

      </div>
      <ul ref={listRef}>
        {props.tasks.map((task: TaskType) => {
          const onRemoveTaskHandler = () => props.removeTask(task.id, props.id);
          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input type="checkbox"
                     checked={task.isDone}
                     onChange={onChangeHandler}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveTaskHandler}>✖️</button>
              {/*<Button name={'✖️'} onClick={() => onRemoveTaskHandler(task.id)}/>*/}

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
