import { minuteApi } from '@/api';
import { router } from '@/router';

const state = {
	status: { submiting: false },
    minute: {},
    all: {},
    byattendee: {},
    byauthor: {}
};

const actions = {

    getAll({ commit }) {
        commit('getAllRequest');

        minuteApi.getAll()
            .then(
                minutes => commit('getAllSuccess', minutes),
                error => commit('getAllFailure', error)
            );
    },

    getAllByAttendeeId({ commit }, id) {
        commit('getAllByAttendeeRequest');

        minuteApi.getAllByAttendeeId(id)
            .then(
                minutes => commit('getAllByAttendeeSuccess', minutes),
                error => commit('getAllByAttendeeFailure', error)
            );
    },

    getAllByAuthorId({ commit }, id) {
        commit('getAllByAuthorRequest');

        minuteApi.getAllByAuthorId(id)
            .then(
                minutes => commit('getAllByAuthorSuccess', minutes),
                error => commit('getAllByAuthorFailure', error)
            );
    },

    getById({ commit }, id) {
        commit('getMinuteRequest', id);

        minuteApi.getById(id)
            .then(
                minute => commit('getMinuteSuccess', minute),
                error => commit('getMinuteFailure', { id, error: error.toString() })
            );
    },

    create({ dispatch, commit }, minute) {
        commit('createRequest', minute);
    
        minuteApi.create(minute)
            .then(
                minute => {
                    commit('createSuccess', minute);
                    router.push('/');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Minute created successful', { root: true });
                    })
                },
                error => {
                    commit('createFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }	
};

const mutations = {
    /* All minutes*/
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, minutes) {
        state.all = { items: minutes };
    }, 
    getAllFailure(state, error) {
        state.all = { error };
    },

    /* Get an minute */
    getMinuteRequest(state, id) {
        state.minute = { loading: true };
    },    
    getMinuteSuccess(state, minute) {
        state.minute = minute;
    }, 
    getMinuteFailure(state, error) {
        state.minute = { error };
    },        

    /* Get all minutes by attendee */
    getAllByAttendeeRequest(state) {
        state.byattendee = { loading: true };
    },     
    getAllByAttendeeSuccess(state, minutes) {
        state.byattendee = { items: minutes };
    },    
    getAllByAttendeeFailure(state, error) {
        state.byattendee = { error };
    },

    /* Get all minutes by author */
    getAllByAuthorRequest(state) {
        state.byauthor = { loading: true };
    },       
    getAllByAuthorSuccess(state, minutes) {
        state.byauthor = { items: minutes };
    },  
    getAllByAuthorFailure(state, error) {
        state.byauthor = { error };
    },    

    /* Create a minute */       
    createRequest(state, minute) {
        state.status = { submiting: true };
    },
    createSuccess(state, minute) {
        state.status = {};
    },
    createFailure(state, error) {
        state.status = {};
    }    
};

export const minute = {
    namespaced: true,
    state,
    actions,
    mutations
};