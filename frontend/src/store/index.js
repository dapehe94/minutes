import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './modules/alert';
import { auth } from './modules/auth';
import { user } from './modules/user';
import { minute } from './modules/minute';
import { company } from './modules/company';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        auth,
        user,
        minute,
        company
    }
});
