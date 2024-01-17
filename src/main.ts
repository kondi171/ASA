import { createApp } from 'vue'
import './assets/scss/main.scss';
import App from './App.vue'
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay, faShuffle, faUpload, faCircleInfo, faDownload, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);
app.use(createPinia());
library.add(faPlay, faUpload, faShuffle, faCircleInfo, faDownload, faChevronRight);
app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
