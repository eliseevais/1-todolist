import {useState} from "react";
import {todolistID01, todolistID02} from "../id-utils";
import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";

export function useTodolists(onTodolistRemove: (todolistId: string) => void,
                             onTodolistAdded: (id: string) => void) {
  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID01, title: 'What to learn', filter: 'all'},
    {id: todolistID02, title: 'What to buy', filter: 'all'},
  ]);

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    onTodolistRemove(todolistId)
  }

  function addTodoList(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      filter: "all",
      title: title
    }
    setTodolists([newTodolist, ...todolists]);
    onTodolistAdded(newTodolistId)
  }

  return {
    todolists,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    addTodoList,
  }
}