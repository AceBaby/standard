import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import Auth from '../utils/Auth';
Vue.use(Router);
const router = new Router({
    // mode: 'history',
    routes

});
/**
 * 重定向前需要执行的操作。
 * 1.页面相互跳转时，需要进行的特别操作
 * 2.登陆token验证。验证通过，进行后续页面跳转;
 *    验证不通过，直接调转到/login，隐藏多余组件
 */
router.beforeEach((to, from, next) => {
    // 进入系统时 如果路径为'/'自动跳转到登录页面
    if (to.path === '/') {
        next('/login');
    }
    if (to.matched.some(record => record.meta.requireAuth)) {
        next();
    } else {
        if (Auth.getSessionStorage('SESSION_REGISTER_FLAG')) {
            next();
        } else {
            if (to.path === '/login') {
                next();
            } else {
                next({ path: '/login' });
            }
        }
    }
});

export default router;
