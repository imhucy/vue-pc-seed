import Vue from 'vue'
import App from '@/App'
import router from 'router'
import store from 'store'
// import { mixinUtil } from '@/mixin/mixinUtil'
// import { mixinTitle } from '@/mixin/mixinTitle'
// import { mixinSentry } from '@/mixin/mixinSentry'
// import { mixinLoadmore } from '@/mixin/mixinLoadmore'
// import { mixinBackForward } from '@/mixin/mixinBackForward'
// import { mixinRequestQueue } from '@/mixin/mixinRequestQueue'
// import { mixinCommonFilter } from '@/mixin/mixinCommonFilter'
// import { mixinCommonComponent } from '@/mixin/mixinCommonComponent'
// import { mixinSwiper } from '@/mixin/mixinSwiper'

Vue.config.productionTip = false

// mixinUtil(Vue)
// mixinTitle(Vue)
// mixinSentry(Vue)
// mixinLoadmore(Vue)
// mixinBackForward(Vue, router)
// mixinRequestQueue(Vue)
// mixinSwiper(Vue)
// mixinCommonFilter(Vue)
// mixinCommonComponent(Vue)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
