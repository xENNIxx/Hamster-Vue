import {createApp} from 'vue'
import { createStore } from './store'
import { checkValue } from './assets/js/utils'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './registerServiceWorker'

const app = createApp(App)

const store = createStore(app)

const rootApp = app.use(store)

const HOSTNAME = "http://localhost:8080/api/"
app.config.globalProperties.hostname = HOSTNAME
app.config.globalProperties.checkValue = checkValue // für was genau??? 

app.config.globalProperties.entity_symbols = Object.freeze({
    PLAYER: ">",
    WALL: "#",
    CORN: "*"
})

rootApp.use(router)
    .mount('#app')

export{
    HOSTNAME,
    store
}
