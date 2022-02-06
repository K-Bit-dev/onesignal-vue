# onesignal-vue-3
This is a fork of the official onesignal-vue package that has been altered to work with vue3.

Add the following to your `main.ts` file:

```javascript
import { createApp } from 'vue';
import OneSignalVue from 'onesignal-vue-3';

createApp(App)
  .use(OneSignalVue, {
    appId: process.env.VUE_APP_ONESIGNAL_APP_ID,
  })
  .mount('#app')
```

Please check the docs of the original package to find out more information about possible configurations and usages.
