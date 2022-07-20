import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import { exportExcel } from '@/utils/export'
import '@/element-ui'
import '@/icons'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest'
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(VueCookie)
Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest
Vue.prototype.isAuth = isAuth
Vue.prototype.$exportExcel = exportExcel

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
