<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <div class="column is-4 is-offset-4">
                <h1>login</h1>

                <b-field :type="{ 'is-danger': errors.has('email') }" :message="errors.first('email')">
                    <b-input type="text" 
                            v-model="email" 
                            name="email" 
                            placeholder="Email" 
                            v-validate="'required|email'"
                            data-vv-as="email"
                            size="is-medium"
                            icon-pack="fas" 
                            icon="envelope">
                    </b-input>
                </b-field>

                <b-field :type="{ 'is-danger': errors.has('password') }" :message="errors.first('password')">
                    <b-input type="password"
                        v-model="password"
                        name="password"
                        placeholder="Password"         
                        v-validate="{ required: true, min: 6 }"               
                        size="is-medium"
                        icon-pack="fas"
                        icon="lock"
                        password-reveal>
                    </b-input>
                </b-field>             
                <button type="submit" :class="[status.loggingIn ? 'button is-link is-fullwidth is-loading' : 'button is-link is-fullwidth']">Login</button>
                <router-link to="/register" class="btn btn-link">Register</router-link>                                          
            </div>

        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('auth', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('auth', ['login', 'logout']),
        handleSubmit(e) {
            this.submitted = true;
            const { email, password } = this;
            this.$validator.validateAll().then(valid => {
                if (valid) {
                    this.login({ email, password });
                    return;
                }
                this.$buefy.toast.open({
                    message: 'Form is not valid! Please check the fields.',
                    type: 'is-danger',
                    position: 'is-bottom'
                })                
            });
        }
    }

};
</script>