import Vue from 'vue'
import App from './App.vue'
import OneSignal from 'onesignal-vue';

Vue.config.productionTip = false
Vue.use(OneSignal);

new Vue({
  render: h => h(App),
  beforeMount() {
    this.$OneSignal.init({ appId: "8e7fe838-fbcd-4152-980d-32565a2dcf03", allowLocalhostAsSecureOrigin: true })
  }
}).$mount('#app')
