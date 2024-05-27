import {ResponseType, instance, LoginParamsType} from "../utils/instance";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId?: number}>>(`auth/login`, data)
  },
  me() {
    return instance.get<ResponseType<{id: string, email: string, login: boolean}>>(`/auth/me`)
  },
  logout() {
    return instance.delete<ResponseType<{userId?: number}>>(`/auth/login`)
  }
}