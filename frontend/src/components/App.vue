<template>
	<div>
		<nav class="navbar is-fixed-top is-transparent " role="navigation" aria-label="main navigation" style="box-shadow: 0 1px rgba(99,114,130,0.16);" v-if="auth.status.loggedIn">
			<div class="container">		  
			  	<div class="navbar-brand">
		            <router-link :to="{name: 'HomePage'}" class="navbar-item">
			            <b-icon
			                pack="fas"
			                icon="h-square"
			                size="is-medium"
			                type="is-primary">
			            </b-icon>
		            </router-link>
				    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarminutes">
				      <span aria-hidden="true"></span>
				      <span aria-hidden="true"></span>
				      <span aria-hidden="true"></span>
				    </a>
			  	</div>

				<div id="navbarminutes" class="navbar-menu">

				    <div class="navbar-start">

						<div class="navbar-item has-dropdown is-hoverable" v-if="auth.user.setting.selectedcompany">
							<a class="navbar-link is-arrowless">
								{{ auth.user.setting.selectedcompany.name }}
							</a>
							<div class="navbar-dropdown is-boxed">
		                        <div class="scrollable maxh300" id="companyselector">
		                            <a href="#" 
		                                v-for="company in auth.user.companies" 
		                                :key="company._id" 
		                                :data-company="company._id" 
		                                v-on:click="selectcompany" 
		                                :class="[company._id == auth.user.setting.selectedcompany._id ? 'navbar-item is-active' : 'navbar-item']">
		                            {{company.name}}</a>
		                        </div>
								<hr class="navbar-divider">
								<router-link class="navbar-item" :to="{name: 'CreateCompany'}">
									<b-tooltip label="Add new company" position="is-bottom" type="is-dark">
										<strong>+</strong></span>  company
									</b-tooltip>
								</router-link>
							</div>
						</div>

				    </div>

					<div class="navbar-end">
	                    <a href="#" class="navbar-item">
	                        <i class="fas fa-search"></i>
	                    </a>
	                    <router-link :to="{name: 'CreateMinute'}" class="navbar-item">
	                        <i class="fas fa-plus"></i>
	                    </router-link>                    
						<div class="navbar-item has-dropdown is-hoverable">

							<a class="navbar-link" v-if="auth.user.profile.avatar == 'src/assets/images/uploads/default.jpg'">
								<avatar :username="auth.user.name" :size="24"></avatar>
							</a>
							<a class="navbar-link" v-else>
								<figure class="image is-24x24">
								  <img class="is-rounded" :src="auth.user.profile.avatar">
								</figure>								
							</a>

							<div class="navbar-dropdown is-right">
								<router-link class="navbar-item" :to="{name: 'ShowProfile'}">Profile</router-link>
								<router-link class="navbar-item" :to="{name: 'CreateCompany'}">Companies</router-link>
								<a class="navbar-item">Settings</a>
								<hr class="navbar-divider">
								<router-link class="navbar-item" to="/login">Logout</router-link>
							</div>
						</div>
					</div>

			  	</div>
			</div>
		</nav>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
            this.clearAlert();
        }
    } 
};
</script>