import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/tasks-api";

export default {
  title: 'Task Component',
  component: Task
}
const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const changeRemoveTaskCallback = action('Remove Button clicked changed inside Task')
export const TaskComponentBaseExample = () => {
  return <>
    <Task
      task={{
        id: '12wsdewfijdei2343',
        title: 'CSS',
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todoListId={"todolistId1"}
    />
    <Task
      task={{
        id: '12wsdewfijdei2344',
        title: 'HTML',
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.low,
        description: ''
      }}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={changeRemoveTaskCallback}
      todoListId={'todolistId2'}
    />
  </>
}