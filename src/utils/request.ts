//进行axios二次封装:使用请求与封装拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const status = error.response?.status

    const messageMap: Record<number, string> = {
      401: 'TOKEN过期',
      403: '无权访问',
      404: '请求地址错误',
      500: '服务器出现问题'
    }

    const message = messageMap[status] || '网络出现问题'

    ElMessage({
      type: 'error',
      message
    })
    return Promise.reject(error)
  }
)

export default request
