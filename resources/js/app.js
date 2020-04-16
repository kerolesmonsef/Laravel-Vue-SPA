import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import routes from "./routes";

require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MainApp from "./components/MainApp";
import storeData from "./store";

Vue.use(VueRouter)
Vue.use(Vuex)

export const store = new Vuex.Store(storeData);

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/Laravel-Vue-SPA/',
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const currentUser = store.state.currentUser;
    if (requiresAuth && !currentUser)
        next("/");
    else
        next()
})

const app = new Vue({
    el: '#app',
    components: {MainApp},
    router,
    store,
});
