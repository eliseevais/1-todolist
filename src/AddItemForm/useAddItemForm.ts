import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm = ( onItemAdded: (title: string) => void) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (event.key === 'Enter') {
      onItemAdded(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      onItemAdded(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Field is required')
    }
  };

  return {
    newTaskTitle,
    onNewTitleChangeHandler,
    onKeyPressHandler,
    error,
    addTask
  }
}