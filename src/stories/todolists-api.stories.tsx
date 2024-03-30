import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistAPI.getTodolists()
      .then(response => {
        setState(response.data)
      })
  }, []);

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistName, setTodolistName] = useState<any>('');

  // useEffect(() => {
  //   todolistAPI.createTodolist('333 NEW TITLE FROM STORIES')
  //     .then(response => {
  //       setState(response.data)
  //     })
  // }, []);

  const onChangeTodolistNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistName(event.currentTarget.value)
  };

  const createTodolistHandler = () => {
    todolistAPI.createTodolist(todolistName)
      .then(response => {
        setState(response.data)
      })
  }

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <input placeholder={'todolist name'}
             value={todolistName}
             onChange={onChangeTodolistNameHandler}
      />
      <button onClick={createTodolistHandler}>create todolist</button>
    </>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>('');

  // useEffect(() => {
  //   const todolistId = 'd6f235b4-bb23-4111-97ca-2fb47e31b837'
  //   todolistAPI.deleteTodolist(todolistId)
  //     .then(response => setState(response.data))
  // }, []);

  const deleteTodolistHandler = () => {
    todolistAPI.deleteTodolist(todolistId)
      .then(response => {
        setState(response.data)
      })
  };
  const onChangeTodolistIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input placeholder={'todolistId'}
               value={todolistId}
               onChange={onChangeTodolistIdHandler}
        />
        <button onClick={deleteTodolistHandler}>delete todolist</button>
      </div>
    </>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [todolistTitle, setTodolistTitle] = useState<string>('');

  // useEffect(() => {
  //   const todolistId = 'd9bbe15f-ee0a-4131-b4e3-b629c242bc2a';
  //
  //   todolistAPI.updateTodolist(todolistId, 'TITLE YOYOYO')
  //     .then(response => setState(response.data))
  // }, [])

  const updateTodolistTitleHandler = () => {
    todolistAPI.updateTodolist(todolistId, todolistTitle)
      .then(response => {
        setState(response.data)
      })
  };
  const onChangeTodolistIDHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistId(event.currentTarget.value)
  };
  const onChangeTodolistTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodolistTitle(event.currentTarget.value)
  };

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <div>
        <input placeholder={'todolistId'}
               value={todolistId}
               onChange={onChangeTodolistIDHandler}
        />
        <input placeholder={'new todolist title'}
               value={todolistTitle}
               onChange={onChangeTodolistTitleHandler}
        />
        <button onClick={updateTodolistTitleHandler}>update todolist title
        </button>
      </div>
    </>
  )
}