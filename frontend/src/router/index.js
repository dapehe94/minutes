import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import HomePage from '@/components/home/HomePage'
import LoginPage from '@/components/user/login'
import RegisterPage from '@/components/user/register'

import CreateMinute from '@/components/minute/create'
import ShowMinute from '@/components/minute/show'

import CreateCompany from '@/components/company/create'
/*import ShowCompany from '@/components/company/show'*/

import ShowProfile from '@/components/user/profile'

import company from '@/middleware/company';

export const router = new Router({
  /*mode: 'history',*/
  routes: [
    { path: '/', name: 'HomePage', component: HomePage, beforeEnter: company },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },

    { path: '/minute/create', name: 'CreateMinute', component: CreateMinute, beforeEnter: company },
    { path: '/minute/:id', name: 'ShowMinute', component: ShowMinute, beforeEnter: company },

    { path: '/company/create', name: 'CreateCompany', component: CreateCompany },
    /*{ path: '/company/:id', name: 'ShowCompany', component: ShowCompany, beforeEnter: company },   */ 
    { path: '/company/:id', name: 'ShowCompany', component: CreateCompany, beforeEnter: company },   

    { path: '/profile', name: 'ShowProfile', component: ShowProfile, beforeEnter: company },        

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})