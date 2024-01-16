import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  return (
    editMode
      ? <TextField onBlur={activateViewMode}
                   onChange={onChangeTitleHandler}
                   value={title} autoFocus

                   size="small"
                   multiline
                   style={{
                     maxHeight: '10px',
                     maxWidth: '180px',
                   }}
      />
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}