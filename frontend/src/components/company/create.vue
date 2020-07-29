<template>

    <div class="columns">
        <div class="column is-3">
            <aside class="menu">
                <p class="menu-label">
                    {{auth.user.name}} companies
                </p>
                <ul v-if="auth.user.companies" class="menu-list">
                    <li v-for="company in auth.user.companies" :key="company.id">
                        <router-link 
                                :to="{ name: 'ShowCompany', params: { id: company._id } }" 
                                @click.native="getCompany(company)"
                                class="menu-item">
                            {{company.name}}
                        </router-link>
                    </li>
                </ul>
                <p class="menu-label">
                    create a new company
                    <form @submit.prevent="handleSubmit">
                        <b-field :type="{ 'is-danger': submitted || errors.has('email') }" :message="errors.first('company.name')">
                            <b-input type="text" 
                                    v-model="company.name" 
                                    name="name" 
                                    placeholder="company name" 
                                    v-validate="'required'">
                            </b-input>
                        </b-field>       
                        <button type="submit" :class="[status.loggingIn ? 'button is-link is-fullwidth is-loading' : 'button is-link is-fullwidth']">create</button>
                    </form>
                </p>
            </aside>
        </div>
        <div class="column is-9">
            <showcompany :selectedcompany="selectedcompany"></showcompany>
        </div>
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex'
import ShowCompany from '@/components/company/show'

export default {
    data () {
        return {
            company: {
                
            },
            selectedcompany: {},
            submitted: false
        }
    },   
    computed: {
        ...mapState({
            auth: state => state.auth,
            status: state => state.company
        }),
        user_id: function() {
            return this.auth.user._id
        }        
    },  
    methods: {
        ...mapActions('company', ['create']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.create({ company: this.company, user_id: this.user_id })
                }
            });
        },
        getCompany(company) {
            this.selectedcompany = company
        }           
    },
    components: {
        'showcompany': ShowCompany
    }      
};
</script>