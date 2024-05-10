import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer, updateTaskAC
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC
} from "./todolists-reducer";
import {TasksStateType} from "../../app/App";

let todoListId1: Array<TaskType>;
let todoListId2: Array<TaskType>;

beforeEach(() => {
   todoListId1 = [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
    todoListId2 = [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: "todoListId2",
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
        todoListId: "todoListId2",
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
        todoListId: "todoListId2",
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
    'todoListId1': todoListId1,
    'todoListId2': todoListId2
  };

  const action = removeTaskAC('2', 'todoListId2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    'todoListId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ],
    'todoListId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: "todoListId2",
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
        todoListId: "todoListId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
  });
  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(2);
});

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    'todoListId1': todoListId1,
    'todoListId2': todoListId2
  };

  // const action = addTaskAC('juice', 'todoListId2');
  const action = addTaskAC({
    todoListId: 'todoListId2',
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

  expect(endState['todoListId1'].length).toBe(3);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe('juice');
  expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    'todoListId1': todoListId1,
    'todoListId2': todoListId2
  };

  // const action = updateTaskAC('2', TaskStatuses.New, 'todoListId2');
  const action = updateTaskAC('2', {status: TaskStatuses.New}, 'todoListId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'][1].status).toBe(TaskStatuses.New);
  expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed);
});

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    'todoListId1': todoListId1,
    'todoListId2': todoListId2
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
  const newKey = keys.find(k => k != 'todoListId1' && k != 'todoListId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([])
});

test('property with todoListId should be deleted', () => {
  const startState: TasksStateType = {
    'todoListId1': todoListId1,
    'todoListId2': todoListId2
  }

  const action = removeTodolistAC('todoListId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todoListId2']).not.toBeDefined()
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
    "todoListId1": [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
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
        todoListId: "todoListId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ],
    "todoListId2": [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: "todoListId2",
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
        todoListId: "todoListId2",
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
        todoListId: "todoListId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }
    ]
  }
  const action = setTasksAC(startState["todoListId1"], "todoListId1")

  const endState = tasksReducer({
    "todoListId2": [],
    "todoListId1": [],
  }, action)

  expect(endState["todoListId1"].length).toBe(3)
  expect(endState["todoListId2"].length).toBe(0)
})

