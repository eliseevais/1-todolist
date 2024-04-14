import {
  addTaskAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TasksStateType} from '../App/App'
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC
} from "./todolists-reducer";

let todolistId1: Array<TaskType>;
let todolistId2: Array<TaskType>;

beforeEach(() => {
   todolistId1 = [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
    todolistId2 = [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
})
test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    'todolistId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ],
    'todolistId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
  });
  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  // const action = addTaskAC('juice', 'todolistId2');
  const action = addTaskAC({
    todolistId: 'todolistId2',
    title: 'juice',
    status: TaskStatuses.New,
    addedDate: '',
    order: 0,
    priority: TaskPriorities.low,
    description: '',
    deadline: '',
    startDate: '',
    id: 'testId'
  });

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  // const action = updateTaskAC('2', TaskStatuses.New, 'todolistId2');
  const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('task for title should be changed and correct', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  };

  const action = changeTaskTitleAC('1', 'Typescript', 'todolistId1');

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'][0].title).toBe('Typescript');

});

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  }

  // const action = addTodolistAC('new todolist')
  const action = addTodolistAC({
    id: 'todolist id test',
    title: 'new todolist',
    order: 0,
    addedDate: ''
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    'todolistId1': todolistId1,
    'todolistId2': todolistId2
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
});

test('empty arrays should be added when we set todolists', () => {
  const action = setTodolistsAC([
    {id: '1', title: 'What to learn', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', addedDate: '', order: 0}
  ])

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
});

test('tasks should be added for todolists', () => {
  let startState = {
    "todolistId1": [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todolistId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ],
    "todolistId2": [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todolistId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
  }
  const action = setTasksAC(startState["todolistId1"], "todolistId1")

  const endState = tasksReducer({
    "todolistId2": [],
    "todolistId1": [],
  }, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})

