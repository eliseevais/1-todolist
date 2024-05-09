import {useState} from "react";
import {todolistId01, todolistId02} from "../id-utils";
import {v1} from "uuid";
import {  FilterValueType,  TodolistDomainType} from "../../../features/TodoListList/todolists-reducer";

export function useTodolists(onTodolistRemove: (todoListId: string) => void,
                             onTodolistAdded: (id: string) => void) {
  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistId01, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
    {id: todolistId02, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
  ]);

  function changeFilter(value: FilterValueType, todoListId: string) {
    let todolist = todolists.find(tl => tl.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }

  function changeTodolistTitle(todoListId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todoListId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(todoListId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todoListId);
    setTodolists(filteredTodolists);
    onTodolistRemove(todoListId)
  }

  function addTodoList(title: string) {
    let newtodolistId = v1();
    let newTodolist: TodolistDomainType = {
      id: newtodolistId,
      filter: "all",
      title: title,
      order: 0,
      addedDate: '',
      entityStatus: 'idle'
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