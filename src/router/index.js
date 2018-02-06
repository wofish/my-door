import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App';
// import { setStore } from '../common/js/util';

Vue.use(VueRouter);

const home = r => require.ensure([], () => r(require('../components/home/home')), 'home');
const login = r => require.ensure([], () => r(require('../components/login/login')), 'login');
const test = r => require.ensure([], () => r(require('../components/test/test')), 'test');

const menu = r => require.ensure([], () => r(require('../components/menu/menu')), 'menu');
const org = r => require.ensure([], () => r(require('../components/org/org')), 'org');
/*const roleMenu = r => require.ensure([], () => r(require('../components/roleMenu/roleMenu')), 'role-menu');
const role = r => require.ensure([], () => r(require('../components/role/role')), 'role');
const userOrg = r => require.ensure([], () => r(require('../components/userOrg/userOrg')), 'user-org');
const userRole = r => require.ensure([], () => r(require('../components/userRole/userRole')), 'user-role');
const user = r => require.ensure([], () => r(require('../components/user/user')), 'user');*/
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
            path: '/home',
            component: home,
            children: [
                {
                    path: '',
                    redirect: '/login'
                },
                {
                    path: 'test',
                    component: test
                },
                {
                    path: 'menu',
                    component: menu
                },
                {
                    path: 'org',
                    component: org
                }/*,
                {
                    path: 'role-menu',
                    component: roleMenu
                },
                {
                    path: 'role',
                    component: role
                },
                {
                    path: 'user-org',
                    component: userOrg
                },
                {
                    path: 'user-role',
                    component: userRole
                },
                {
                    path: 'user',
                    component: user
                }*/
            ]
        }
    ]
}];

const router = new VueRouter({
    // mode: 'history',
    routes
});

const registerRoutes = [
    '/', '/login', '/home', '/test', '/home/test',
    '/home/menu', '/home/org'
    /*, '/home/role-menu', '/home/role', '/home/user-org', '/home/user-role', '/home/user'*/
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
