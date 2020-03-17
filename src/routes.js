import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/store';

import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import DashboardHome from './components/Dashboard/DashboardHome';
import Main from './components/Dashboard/Main';
import AddPosts from './components/Dashboard/AddPosts';
import ListPosts from './components/Dashboard/ListPosts';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {

        const redirect = () => {
            if (store.state.admin.token) {
                if (to.path === '/signin') {
                    next('/dashboard')
                } else {
                    next()
                }
            } else {
                if (to.path === '/signin') {
                    next()
                } else {
                    next('/')
                }
            }
        }

        if (store.state.admin.refreshLoading) {
            store.watch((state, getters) => getters['admin/refreshLoading'], () => {
                redirect()
            })
        } else {
            redirect()
        }
    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: SignIn, ...authGuard },
    {
        path: '/dashboard', component: DashboardHome, children: [
            { path: '/', component: Main },
            { path: 'add_posts', component: AddPosts },
            { path: 'posts_list', component: ListPosts }
        ], ...authGuard
    }
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});