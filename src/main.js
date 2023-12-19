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
//arrays beinhalten keine Objekte -> gespeichert als JSON-Strings
let g_Programs = []
let g_Terrains = []
let g_Tabs = []
let g_Dics = []
app.config.globalProperties.hostname = HOSTNAME
app.config.globalProperties.checkValue = checkValue
app.config.globalProperties.$g_Programs = g_Programs
app.config.globalProperties.$g_Terrains = g_Terrains
app.config.globalProperties.$g_Tabs = g_Tabs
app.config.globalProperties.$g_Dics = g_Dics

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
