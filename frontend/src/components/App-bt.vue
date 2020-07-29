<template>
    <div>
        <nav class="navbar navbar-expand-lg fixed-top navbar-light shadow-sm" style="background-color: #fff; box-shadow: 0 1px rgba(99,114,130,0.16);" v-if="auth.status.loggedIn">
            <router-link :to="{name: 'HomePage'}" class="nav-link">
                <i class="fas fa-h-square fa-lg"></i>
            </router-link> 
            <div v-if="auth.user.setting">{{ auth.user.setting.selectedcompany.name }}</div>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-md-auto">

                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="fas fa-search"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <div class="vertical-divider"></div>
                </li>

                <li class="nav-item">
                    <router-link :to="{name: 'CreateMinute'}" class="nav-link">
                        <span style="color: Dodgerblue;">
                            <i class="fas fa-plus"></i>
                        </span>
                    </router-link>
                </li>

                <li class="nav-item dropdown" v-if="auth.user.setting">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-briefcase"></i>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right">
                        <h6 class="dropdown-header">select company</h6>
                        <div class="scrollable" id="companyselector">
                            <a href="#" 
                                v-for="company in auth.user.companies" 
                                :key="company._id" 
                                :data-company="company._id" 
                                v-on:click="selectcompany" 
                                :class="[company._id == auth.user.setting.selectedcompany._id ? 'dropdown-item active' : 'dropdown-item']">
                            {{company.name}}</a>
                        </div>
                        <div class="dropdown-divider"></div>
                        <router-link class="dropdown-item" :to="{name: 'CreateCompany'}" data-toggle="tooltip" data-placement="bottom" title="Add new company">
                            <span style="color: Dodgerblue;"><strong>+</strong></span> company
                        </router-link>
                    </div>
                    
                </li>

                <li class="nav-item dropdown my-2 my-lg-0">
                    <a class="nav-link dropdown-toggle" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="far fa-user"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <h6 class="dropdown-header">user options</h6>
                        <router-link class="dropdown-item" :to="{name: 'ShowProfile'}">profile</router-link>
                        <router-link class="dropdown-item" to="/login">logout</router-link>
                    </div>
                </li>

            </ul>

          </div>
        </nav>        
        <div class="container-fluid" id="container">
            <div class="row ml-sm-1">
                <div class="col">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { companyApi } from '@/api';

export default {
    data () {
        return {
            minute: {
                subject: ''
            },
        }
    },   
    name: 'app',
    computed: {
        ...mapState({
            auth: state => state.auth,
            alert: state => state.alert
        }),
        user_id: function() {
            return this.auth.user._id
        }
    },
    created: function() {
        if (this.auth.status.loggedIn) {
            return this.getCurrent()
        }
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        }),
        ...mapActions('user', ['update']),
        ...mapActions('auth', ['getCurrent']),
        selectcompany: function(event){
            $('div#companyselector > a').removeClass('active')
            $(event.target).addClass('active')
            this.company = event.target.getAttribute('data-company')
            this.update( { id: this.user_id, user: { setting: { selectedcompany: this.company } } })
        }
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>