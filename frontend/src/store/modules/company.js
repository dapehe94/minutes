import { companyApi } from '@/api';
import { router } from '@/router';

const state = {
    status: {},
    company: {}
};

const actions = {

    getById({ commit }, id) {
        commit('getCompanyRequest');

        companyApi.getById(id)
            .then(
                company => commit('getCompanySuccess', company),
                error => commit('getCompanyFailure', { id, error: error.toString() })
            );
    },

    create({ dispatch, commit, rootState }, {company, user_id}) {
        commit('createRequest', company);
        console.log(company)
        companyApi.create({company, user_id})
            .then(
                data => {
                    commit('createSuccess', data.company);
                    commit('auth/loginSuccess', data.user, { root: true });
                },
                error => {
                    commit('createFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );

    }	
};

const mutations = {      
    /* Create a company */    
    createRequest(state, company) {
        state.status = { submiting: true };
    },
    createSuccess(state, company) {
        state.status = {};
    },
    createFailure(state, error) {
        state.status = {};
    },    

    /* Get a company */
    getCompanyRequest(state) {
        state.company = { loading: true };
    },    
    getCompanySuccess(state, company) {
        state.company = company;
    }, 
    getCompanyFailure(state, error) {
        state.company = { error };
    }
};

export const company = {
    namespaced: true,
    state,
    actions,
    mutations
};