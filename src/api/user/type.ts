// 用户登录接口携带的参数类型
export interface loginFormData {
  username: string
  password: string
}

// 全部接口返回数据通用类型
export interface ResponseData<T> {
  code: number
  message: string
  data: T
  ok: boolean
}

// 用户信息接口返回的 data 类型
export interface UserInfoResponseData {
  avatar: string
  buttons: string[]
  name: string
  roles: string[]
  routes: string[]
}
