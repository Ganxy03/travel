import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PrimeVue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Editor from 'primevue/editor';
import Paginator from 'primevue/paginator';
import Tree from 'primevue/tree';
import ConfirmDialog from 'primevue/confirmdialog';


Vue.component('InputText', InputText);
// eslint-disable-next-line
Vue.component('Button', Button);
// eslint-disable-next-line
Vue.component('Editor', Editor);
// eslint-disable-next-line
Vue.component('Paginator', Paginator);
// eslint-disable-next-line
Vue.component('Tree', Tree);
Vue.component('ConfirmDialog', ConfirmDialog);

Vue.use(PrimeVue);
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
