import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGrip } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faXmark, faGrip, faChevronDown );

createApp(App).use(createPinia()).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
