import React from 'react'
import { Provider } from 'react-redux';
import {AppRootStateType} from "../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
        todolistId: "todolistId1", startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''},
      {id: v1(), title: "JS", status: TaskStatuses.New,
        todolistId: "todolistId1", startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk",  status: TaskStatuses.Completed,
        todolistId: "todolistId2", startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''},
      {id: v1(), title: "React Book",  status: TaskStatuses.New,
        todolistId: "todolistId2", startDate: '', deadline: '',
        addedDate: '', order: 0, priority: TaskPriorities.low,
        description: ''}
    ]
  }
};

// @ts-ignore
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}