// main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

//fontawesome icons start
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCoffee,
  faUser,
  faCog,
  faHome,
  faSignOutAlt,
  faEnvelope,
  faPhone,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faChevronDown,
  faMapMarkerAlt,
  faComment,
  faStickyNote,
  faTag,
  faTachometerAlt,
  faCheck,
  faCalendar,
  faLongArrowAltRight,
  faLongArrowAltUp,
  faCalendarAlt,
  faEdit,
  faTrash,
  faCommentDots,
  faCogs,
  faSuitcase,
  faBoxOpen,
  faQuoteLeft,
  faHandshake,
  faNewspaper,
  faLineChart,
  faUserCircle,
  faEye,
  faBell,
  faCamera,
  faBars,
  faGlobe,
  faBullseye,
  faBinoculars,
  faBalanceScale,
  faBrain,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faTwitter,
  faYoutube,
  faTelegram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faCoffee,
  faUser,
  faCog,
  faHome,
  faSignOutAlt,
  faEnvelope,
  faPhone,
  faFacebook,
  faTwitter,
  faTelegram,
  faLinkedin,
  faYoutube,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faMapMarkerAlt,
  faComment,
  faStickyNote,
  faTag,
  faTachometerAlt,
  faCheck,
  faCalendar,
  faCalendarAlt,
  faLongArrowAltRight,
  faLongArrowAltUp,
  faEdit,
  faTrash,
  faCommentDots,
  faCogs,
  faSuitcase,
  faBoxOpen,
  faQuoteLeft,
  faHandshake,
  faNewspaper,
  faLineChart,
  faUserCircle,
  faEye,
  faBell,
  faCamera,
  faBars,
  faGlobe,
  faBullseye,
  faBinoculars,
  faBalanceScale,
  faBrain,
  faPlus
)

AOS.init({ duration: 2000 })
//Fontawesomes importing end

import App from './App.vue'
import router from './router'

const app = createApp(App)

//register font awesome
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
