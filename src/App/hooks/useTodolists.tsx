import {useState} from "react";
import {todolistId01, todolistId02} from "../id-utils";
import {v1} from "uuid";
import {  FilterValueType,  TodolistDomainType} from "../../state/todolists-reducer";

export function useTodolists(onTodolistRemove: (todolistId: string) => void,
                             onTodolistAdded: (id: string) => void) {
  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistId01, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
    {id: todolistId02, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
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
    let newtodolistId = v1();
    let newTodolist: TodolistDomainType = {
      id: newtodolistId,
      filter: "all",
      title: title,
      order: 0,
      addedDate: ''
    }
    setTodolists([newTodolist, ...todolists]);
    onTodolistAdded(newtodolistId)
  }

  return {
    todolists,
    changeFilter,
    changeTodolistTitle,
    removeTodolist,
    addTodoList,
  }
}