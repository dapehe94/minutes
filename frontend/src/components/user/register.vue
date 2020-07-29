<template>
    <div>        
        <form @submit.prevent="handleSubmit">
            <div class="column is-4 is-offset-4">
                <h1>Register</h1>
                <b-field :type="{ 'is-danger': submitted || errors.has('name') }" :message="errors.first('name')">
                    <b-input type="text" 
                            v-model="user.name" 
                            name="name" 
                            placeholder="Name" 
                            v-validate="{ required: true, min: 6 }"
                            size="is-medium"
                            icon-pack="fas" 
                            icon="user">
                    </b-input>
                </b-field>

                <b-field :type="{ 'is-danger': submitted || errors.has('email') }" :message="errors.first('email')">
                    <b-input type="text" 
                            v-model="user.email" 
                            name="email" 
                            placeholder="Email" 
                            v-validate="'required|email'"
                            data-vv-as="email"
                            size="is-medium"
                            icon-pack="fas" 
                            icon="envelope">
                    </b-input>
                </b-field>

                <b-field :type="{ 'is-danger': submitted || errors.has('password') }" :message="errors.first('password')">
                    <b-input type="password"
                        v-model="user.password"
                        name="password"
                        placeholder="Password"
                        v-validate="{ required: true, min: 6 }"
                        size="is-medium"
                        icon-pack="fas"
                        icon="lock"
                        password-reveal>
                    </b-input>
                </b-field>
                <button type="submit" :class="[status.registering ? 'button is-link is-fullwidth is-loading' : 'button is-link is-fullwidth']">Register</button>
                <router-link to="/login" class="btn btn-link">Login</router-link>                   
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                name: '',
                email: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState('auth', ['status'])
    },
    methods: {
        ...mapActions('auth', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.register(this.user);
                }
            });
        }
    }
};
</script>