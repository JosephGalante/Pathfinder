import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import { registerPlugins } from './plugins/index'

const app = createApp(App)
registerPlugins(app)

app.mount('#app')
