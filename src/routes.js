import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import DashboardHome from './components/Dashboard/DashboardHome';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        if (store.state.admin.token) {
            next()
        } else {
            next('/')
        }
    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn },
    { path: '/dashboard', component: DashboardHome, children: [], ...authGuard }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})