<template>
	<div>
		<h3>{{auth.user.firstName}} {{auth.user.lastName}} profile</h3>
    	<form @submit.prevent="handleSubmit">

            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="user.name" v-validate="'required'" class="form-control" name="name" id="name" placeholder="First name" :class="{ 'is-invalid': submitted && errors.has('name') }">
                <div v-if="submitted && errors.has('name')" class="invalid-feedback">{{ errors.first('name') }}</div>
            </div>

    		<div class="form-group">
    			<label for="email">Email</label>
    			<input type="text" v-model="user.email" v-validate="'required'" class="form-control" name="email" id="email" placeholder="Email" :class="{ 'is-invalid': submitted && errors.has('email') }">
    			<div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
    		</div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary" :disabled="status.submiting">update</button>
                <img v-show="status.submiting" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/" class="btn btn-link">Cancel</router-link>
            </div>

	   </form>		
	</div>	
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            submitted: false
        }
    },  	
    computed: {
        ...mapState({
            auth: state => state.auth,
            status: state => state.user,
            user: state => state.auth.user
        })       
    },
    methods: {
        ...mapActions('user', ['update']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update( { id: this.user._id, user: this.user });
                }
            });
        }           
    }      
};
</script>