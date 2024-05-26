import {Dispatch} from "redux";
import {AppActionsType, setAppStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/auth-api";
import {LoginParamsType} from "../../utils/instance";
import {
  handleNetworkError,
  handleServerAppError
} from "../../utils/error-utils";
import {AppThunk} from "../../app/store";

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (state: InitialStateType = initialState,
                            action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
};

// actions
export const setIsLoggedInAC = (value: boolean) => (
  {type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
// совокупность множества dispatch, предназн. для изм. state и исп. action
export const loginTC = (data: LoginParamsType): AppThunk => (
  dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI.login(data)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleNetworkError(error, dispatch)
    })
};

export const logoutTC = (): AppThunk => (
  dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleNetworkError(error, dispatch)
    })
};

// types
type InitialStateType = {
  isLoggedIn: boolean
};

type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>;

export type AuthActionsType =
  | setIsLoggedInActionType;
