/* 配置相关常量 */

const host = window.location.hostname

const WEB_CONFIG = {
  dev: {
    baseURL: '/ecpp'
  },
  '192.168.30.179': {
    baseURL: 'http://192.168.30.179:8998/ecpp'
  },
  '132.97.110.254': {
    baseURL: 'http://132.97.110.254/ecpp'
  },
  '132.97.31.125': {
    baseURL: 'http://132.97.31.125:8998/ecpp'
  }
}

export default process.env.NODE_ENV === 'production' ? WEB_CONFIG[host] : WEB_CONFIG.dev
