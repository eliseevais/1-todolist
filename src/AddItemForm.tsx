import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Styles} from './__styles'
import {Add, PostAdd} from "@mui/icons-material";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
}

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.charCode === 13) {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Field is required')
    }
  };

  return (
    <div>
      <TextField id="outlined-basic" label="New value" variant="outlined"
                 value={newTaskTitle}
                 onChange={onNewTitleChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 error={!!error}
                 helperText={error}

      />
      <IconButton onClick={addTask}
                  style={{
                    borderColor: `${Styles.mainColor}`,
                    color: `${Styles.mainColor}`
                  }}
      >
        <PostAdd/>
      </IconButton>
    </div>
  )
}