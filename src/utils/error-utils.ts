import {
  AppActionsType,
  setAppErrorAC,
  setAppStatusAC
} from "../app/app-reducer";
import {ResponseTypeFromServer} from "../api/tasks-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseTypeFromServer<D>, dispatch: Dispatch<AppActionsType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
};

export const handleNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppStatusAC('failed'))
}