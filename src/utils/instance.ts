import axios from 'axios';
export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "7baa0947-f1d6-498f-bd5d-ed507ad6475a",
  },
});

export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
};
type FieldErrorType = {
  error: string
  field: string
};
export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}