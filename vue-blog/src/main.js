import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Adsense from 'vue-google-adsense/dist/Adsense.min.js'
import InArticleAdsense from 'vue-google-adsense/dist/InArticleAdsense.min.js'
import InFeedAdsense from 'vue-google-adsense/dist/InFeedAdsense.min.js'

import ScriptX from 'vue-scriptx'

const app = createApp(App)

app.use(router)

app.use(ScriptX)
app.use(Adsense)
app.use(InArticleAdsense)
app.use(InFeedAdsense)

app.mount('#app')
