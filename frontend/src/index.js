import Vue from "vue";
import App from '@/components/App';
import VeeValidate from 'vee-validate';
import Buefy from 'buefy';
import Avatar from 'vue-avatar';

import { store } from '@/store';
import { router } from '@/router';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(CKEditor);

Vue.use(Buefy, {
    defaultFirstDayOfWeek: 1
});
Vue.use(VeeValidate);


Vue.config.devtools = true;		//change to false in production mode
//Vue.config.performance = true;
Vue.config.productionTip = true; //change to false in production mode

Vue.component('avatar', Avatar);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)   
});