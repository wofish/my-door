import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';
// import { setStore } from '../common/js/util';

Vue.use(VueRouter);

const home = r => require.ensure([], () => r(require('../components/home/home')), 'home');
const login = r => require.ensure([], () => r(require('../components/login/login')), 'login');
const test = r => require.ensure([], () => r(require('../components/test/test')), 'test');
const routes = [{
    path: '/',
    component: App,
    children: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/test',
            component: test
        },
        {
            path: '/home',
            component: home,
            children: [
                {
                    path: '',
                    redirect: '/login'
                }
            ]
        }
    ]
}];

const router = new VueRouter({
    // mode: 'history',
    routes
});

const registerRoutes = [
    '/', '/login', '/home', '/test'
];
router.beforeEach((to, from, next) => {
    // console.log(from.path);
    // setStore('path', to.path);
    if (registerRoutes.findIndex(item => item === to.path) >= 0) {
        next();
    } else {
        next({ path: '/login' });
    }
});

export default router;
