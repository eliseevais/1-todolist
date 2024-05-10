import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {Styles} from '../../app/__styles'
import {PostAdd} from "@mui/icons-material";
import {useAddItemForm} from "./useAddItemForm";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean
}

export const AddItemForm = React.memo(
  ({addItem, disabled = false}: AddItemFormPropsType) => {

    const {
      newTaskTitle,
      onNewTitleChangeHandler,
      onKeyPressHandler,
      error,
      addTask
    } = useAddItemForm(addItem)

    return (
      <div>
        <TextField id="outlined-basic" label="New value" variant="outlined"
                   disabled={disabled}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
                   style={{marginBottom: '8px'}}
        />
        <IconButton onClick={addTask}
                    disabled={disabled}
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