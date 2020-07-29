import { userApi } from '@/api';
import { router } from '@/router';

const state = {
    status: {},
    all: {},
    attendees: [],
    companyusers: []
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        userApi.getAll()
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },

    getAllbyCompanyId({ commit }, id) {
        commit('getAllbyCompanyIdRequest');

        userApi.getAllbyCompanyId(id)
            .then(
                users => commit('getAllbyCompanyIdSuccess', users),
                error => commit('getAllbyCompanyIdFailure', error)
            );
    },

    getAttendees({ commit }, companyid) {
        commit('getAllRequest');

        userApi.getAttendees(companyid)
            .then(
                users => commit('getAllAttendeesSuccess', users),
                error => commit('getAllAttendeesFailure', error)
            );
    },

    delete({ commit }, id) {
        commit('deleteRequest', id);

        userApi.delete(id)
            .then(
                user => commit('deleteSuccess', id),
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    },

    uploadavatar({ dispatch, commit }, id, avatar) {
        commit('uploadavatarRequest');
    
        userApi.uploadavatar(id, avatar)
            .then(
                user => {
                    commit('uploadavatarSuccess', user);                  
                },
                error => {
                    commit('uploadavatarFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    update({ dispatch, commit }, id, user) {
        commit('updateRequest');
    
        userApi.update(id, user)
            .then(
                user => {
                    commit('updateSuccess', user);
                    dispatch('user/getAttendees', user.user.setting.selectedcompany._id, { root: true });
                    commit('auth/loginSuccess', user.user, { root: true });
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'User update successful', { root: true });
                    })                    
                },
                error => {
                    commit('updateFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }    
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, users) {
        state.all = { items: users };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    getAllAttendeesSuccess(state, users) {
        state.attendees = users;
    },
    getAllAttendeesFailure(state, error) {
        state.attendees = error;
    },    
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    },

    /* Get users by company id */
    getAllbyCompanyIdRequest(state) {
        state.status = { loading: true };
    },
    getAllbyCompanyIdSuccess(state, users) {
        state.status = {};
        state.companyusers = users;
    },
    getAllbyCompanyIdFailure(state, error) {
        state.status = {};
    },    

    /* Update a user */       
    updateRequest(state) {
        state.status = { submiting: true };
    },
    updateSuccess(state, user) {
        state.status = { submiting: false };
    },
    updateFailure(state, error) {
        state.status = { submiting: false };
    },

    /* Upload user avatar */       
    uploadavatarRequest(state) {
        state.status = { submiting: true };
    },
    uploadavatarSuccess(state, user) {
        state.status = { submiting: false };
    },
    uploadavatarFailure(state, error) {
        state.status = { submiting: false };
    }      
};

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};
