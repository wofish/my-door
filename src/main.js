import Vue from 'vue';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './common/stylus/index.styl';
import VueLazyload from 'vue-lazyload';
// import VTooltip from 'v-tooltip';
import { VTooltip } from 'v-tooltip';
import VueTouch from 'vue-touch';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.use(iView);
Vue.use(VueLazyload);
Vue.use(VueTouch, { name: 'v-touch' });
// Vue.use(VTooltip);
Vue.directive('tooltip', VTooltip);

// Vue.config.devtools = true;
// Vue.config.silent = false;

new Vue({
    router,
    store
}).$mount('#app');
