// 定义登录接口需要携带参数类型
export interface loginForm {
  username: string
  password: string
}
//登陆接口返回的数据类型
interface dataType {
  token: string
}
export interface loginResponseData {
  code: number
  data: dataType
}

//定义服务器返回用户相关信息的类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userResponseData {
  code: number
  data: user
}
