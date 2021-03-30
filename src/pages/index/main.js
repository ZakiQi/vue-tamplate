import bootstrap from '@/bootstrap'
import App from './App.vue'
import router from './router'
import states from './store'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('./mock/mock.js')
}

bootstrap({ router, states, App })