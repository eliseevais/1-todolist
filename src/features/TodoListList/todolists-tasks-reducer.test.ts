import {
  addTodolistAC,
  TodolistDomainType,
  todolistsReducer
} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../app/App";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC({
    title: 'new title',
    order: 0,
    addedDate: '',
    id: 'test id'
  });

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolist.id);
  expect(idFromTodolists).toBe(action.todolist.id)
});
