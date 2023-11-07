import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { PAGE_NAME } from '@/assets/constant'
import router from '@/router/index'
import { useStoreToken } from '@/stores/useStoreToken'

// loading实例
let loadingInstance
/**
 * 创建axios实例
 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60 * 1000,
})

/**
 * 请求拦截器
 */
instance.interceptors.request.use((config) => {
  // 在pinia注册之后，再次调用才没有问题
  const { getToken } = useStoreToken()
  // 注入token
  config.headers.Authorization = getToken
  // 1.loading加载器
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0,0,0,.7)',
  })

  return config
}, (error) => {
  console.error('请求失败：拦截器', error)
  loadingInstance?.close()

  return Promise.reject(error)
})

/**
 * 返回信息拦截器
 */
instance.interceptors.response.use((response) => {
  console.info('返回成功：拦截器', response)
  // 1.关闭loading
  loadingInstance?.close()

  // 2.错误提示，消息拦截
  handleResponse(response.data)

  // 3.返回信息
  if (response.data.code === 0) {
    return response.data.data
  } else {
    return Promise.reject(response.data)
  }
}, (error) => {
  console.error('返回失败:拦截器', error)
  // 1.关闭loading
  loadingInstance?.close()

  // 2.错误处理
  handleResError(error)

  return Promise.reject(error)
})

/**
 * 返回信息处理,特殊返回码跳转处理
 * @param response
 */
function handleResponse({ code, message }) {
  switch (true) {
    // 警告
    case code > -2000 && code < 0:
      ElMessage({
        type: 'warning',
        message,
      })
      break
    // 提示信息
    case code > -3000 && code < -2000:
      ElMessage(message)
      break
    // 错误信息
    case code <= -5000:
      ElMessage({
        type: 'error',
        message,
      })
      break
    case code === 0:
      ElMessage({
        type: 'success',
        message,
      })
  }

  // 特殊返回码处理
  if (code === -5001) {
    router.push({ name: PAGE_NAME.LoginPage })
  }
}

/**
 * 返回报错处理
 * @param error
 */
function handleResError(error) {
  switch (error.code) {
    case 'ERR_NETWORK':
      ElMessage({
        type: 'error',
        message: '网络异常，请联系服务端～',
      })
      break
    case 'ECONNABORTED':
      ElMessage({
        type: 'error',
        message: '网络连接超时，请稍后再试～',
      })
      break
    default:
      ElMessage({
        type: 'error',
        message: `未知错误${error.message}`,
      })
      break
  }
}

export default instance
