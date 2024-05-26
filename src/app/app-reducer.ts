import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null,
  isInitialized: false
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-IS-INITIALIZED':
      return {...state, isInitialized: action.value}
    default:
      return state
  }
};

export const setAppErrorAC = (error: string | null) => (
  {type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => (
  {type: 'APP/SET-STATUS', status} as const);
export const setAppIsInitializedAC = (value: boolean) => (
  {type: 'APP/SET-IS-INITIALIZED', value} as const);
export const initializedAppTC = () => (dispatch: Dispatch) => {
  authAPI.me()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppIsInitializedAC(true))
      } else {

      }
      dispatch(setAppIsInitializedAC(true))
    })
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
};
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
type SetIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>
export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetIsInitializedActionType;