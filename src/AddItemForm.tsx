import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Styles} from './__styles'
import {PostAdd} from "@mui/icons-material";
import {useAddItemForm} from "./AddItemForm/useAddItemForm";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

  const {
    newTaskTitle,
    onNewTitleChangeHandler,
    onKeyPressHandler,
    error,
    addTask
  } = useAddItemForm(props.addItem)

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
})