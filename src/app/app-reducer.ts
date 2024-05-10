const initialState = {
  status: 'loading' as RequestStatusType,
  error: null
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
    default:
      return state
  }
};

export const setAppErrorAC = (error: string | null) => (
  {type: 'APP/SET-ERROR', error} as const);
export const setAppStatusAC = (status: RequestStatusType) => (
  {type: 'APP/SET-STATUS', status} as const);

// TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null
};
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType;