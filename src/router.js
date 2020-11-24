/**
 * 路由设置
 */

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import menu from './menu';

Vue.use(Router);

const routes = [{
        name: 'login.index',
        path: '/login',
        meta: {
            title: '登录',
        },
        component: () =>
            import ('@/views/login'),
    },
    ...menu,
    {
        path: '*',
        meta: {
            title: '404',
        },
        component: () =>
            import ('@/views/404'),
    },
];

const router = new Router({
    mode: 'history', // 路由模式
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
});

// 路由跳转前进行身份认证

router.beforeEach((to, from, next) => {
    console.log(to.path)
    NProgress.start();
    document.title = to.meta.title;

    // 如果存在 token
    if (Vue.$cookies.get('user_key') != null) {
        next();
    } else {
        const __sidMatch = /\?sid\=(\w+)/

        function getRequestSid() {
            var querySid = location.href.match(__sidMatch)
            if (!querySid) { return false }
            console.log(querySid[1])
            return querySid[1]
        }
        let sid = getRequestSid()
        if (!sid) {
            window.location.assign("https://login.net/sec/login?ref=http://123.123.123.123:666/#/welcome")
        } else {
            Vue.$cookies.set('user_key', 123)
            next();
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});

export default router;