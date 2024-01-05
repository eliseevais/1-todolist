import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};
type TasksStateType = {
  [key: string]: Array<TaskType>
};

function App() {
  let todolistID01 = v1();
  let todolistID02 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistID01, title: 'What to learn', filter: 'all'},
    {id: todolistID02, title: 'What to buy', filter: 'all'},
  ]);

  let [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistID01]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID02]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Tea", isDone: false},
      {id: v1(), title: "Water", isDone: false},
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Paper", isDone: false},
    ]
  });

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasksObj({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({...tasksObj});
  }

  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasksObj({...tasksObj});
    }
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(task => task.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasksObj({...tasksObj});
    }
  };

  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  };
  function removeTodolist(todolistId: string) {
    let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolists);
    delete tasksObj[todolistId];
    setTasksObj({...tasksObj});
  };
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  };
  function addTodoList(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasksObj({
      ...tasksObj,
      [todolist.id]: []})
  };

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

      {
        todolists.map(tl => {
            let tasksForToDoList = tasksObj[tl.id];
            if (tl.filter === 'active') {
              tasksForToDoList = tasksForToDoList.filter(task => task.isDone === false)
            }
            if (tl.filter === 'completed') {
              tasksForToDoList = tasksForToDoList.filter(task => task.isDone === true)
            }

            return (
              <Todolist key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
              >
                <div>
                  <div> Many interesting information</div>
                </div>
              </Todolist>
            )
          }
        )}
    </div>
  )
}

export default App;

