import Vue from 'vue'
import axios from 'axios'
// import Message from 'ant-design-vue/lib/message'
import { getCookie } from '../common/common'
import config from './config'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 60000
})

service.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
service.interceptors.request.use(
  config => {
    const tokenId = getCookie('tokenId')
    config.headers.common = {
      tokenId: tokenId || 'RPMwVLH94qiRHn%2BbZ01A2g%3D%3D'
    }
    return config
  },
  error =>
    // 请求错误处理
    Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 403) {
      // return Message.error(response.data.message)
    }

    if (response && response.status === 200 && response.data.code !== 403) {
      const { data } = response.data
      return data
    }
  },
  _error => {
    // Message.error('请求错误')
    console.log(_error)
  }
)

/**
 * 统一get请求入口
 * @param {object} config 请求参数对象
 * @returns {Promise<AxiosResponse<any>>}
 */
service.get = async config => {
  config.params = { ...config.data, ...config.params }
  delete config.data
  const result = await service({ method: 'GET', ...config })

  return result
}

/**
 * 统一post请求入口
 * @param {object} config 请求参数对象
 * @returns {Promise<AxiosResponse<any>>}
 */
service.post = async config => {
  const result = await service(
    Object.assign(
      {
        method: 'POST'
      },
      config
    )
  )

  return result
}

window.$service = service
Vue.prototype.$service = service

export default service
