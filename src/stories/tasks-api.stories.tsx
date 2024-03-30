import React, {ChangeEvent, useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
  title: 'API',
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  // useEffect(() => {
  //   const todolistId = '2f0c473e-abae-435f-ae69-6af5d5a19935';
  //   tasksAPI.getTasks(todolistId)
  //     .then(response => {
  //       setState(response.data)
  //     })
  // }, []);

  const getTaskHandler = () => {
    tasksAPI.getTasks(todolistId)
      .then(response => {
        setState(response.data)
      })
  };
  const onChangeGetTaskHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input placeholder={'todolistId'}
               value={todolistId}
               onChange={onChangeGetTaskHandler}
        />
        <button onClick={getTaskHandler}>get tasks</button>
      </div>
    </>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');

  // useEffect(() => {
  //   const todolistId = '2f0c473e-abae-435f-ae69-6af5d5a19935';
  //   const title = '444 NEW TASK TITLE';
  //   tasksAPI.createTask(todolistId, title)
  //     .then(response => {
  //       setState(response.data)
  //     })
  // }, []);

  const createTaskHandler = () => {
    tasksAPI.createTask(todolistId, taskTitle)
      .then(response => {
        setState(response.data)
      })
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value)
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input placeholder={'todolistId'}
             value={todolistId}
             onChange={onChangeTodolistIdHandler}
      />
      <input placeholder={'task title'}
             value={taskTitle}
             onChange={onChangeTaskTitleHandler}
      />
      <button onClick={createTaskHandler}>create task</button>
    </>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const deleteTaskHandler = () => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(response => {
        setState(response.data)
      })
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const onChangeTaskIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskId(event.currentTarget.value)
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input placeholder={'todolistId'}
               value={todolistId}
               onChange={onChangeTodolistIdHandler}
        />
        <input placeholder={'taskId'}
               value={taskId}
               onChange={onChangeTaskIdHandler}
        />
        <button onClick={deleteTaskHandler}>delete task</button>
      </div>
    </>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const [taskNewTitle, setTaskNewTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  // useEffect(() => {
  //   const todolistId = 'd9bbe15f-ee0a-4131-b4e3-b629c242bc2a';
  //   const taskId = '70a125f1-a31d-492f-af20-a40c9ee0bf77';
  //   const title = 'UPDATED TASK TITLE';
  //   tasksAPI.updateTask(todolistId, taskId, title)
  //     .then(response => {
  //       setState(response.data)
  //     })
  // }, []);

  const updateTaskTitleHandler = () => {

    tasksAPI.updateTask(todolistId, taskId, {
      deadline: '',
      description: description,
      priority: priority,
      startDate: '',
      status: status,
      title: taskNewTitle
    })
      .then(response => {
        setState(response.data)
      })
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setTodolistId(e.currentTarget.value)
               }}
        />
        <input placeholder={'taskId'} value={taskId}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setTaskId(e.currentTarget.value)
               }}
        />
        <input placeholder={'new task title'} value={taskNewTitle}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setTaskNewTitle(e.currentTarget.value)
               }}
        />
        <input placeholder={'description'} value={description}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setDescription(e.currentTarget.value)
               }}
        />
        <input placeholder={'status'} value={status}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setStatus(+e.currentTarget.value)
               }}
        />
        <input placeholder={'priority'} value={priority}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setPriority(+e.currentTarget.value)
               }}
        />
        <input placeholder={'startDate'} value={startDate}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setStartDate(e.currentTarget.value)
               }}
        />
        <input placeholder={'deadline'} value={deadline}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                 setDeadline(e.currentTarget.value)
               }}
        />
        <button onClick={updateTaskTitleHandler}>update task</button>
      </div>
    </>
  )
}