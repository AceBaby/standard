import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import '@/plugins';
import './element-variables.scss';

import Message from './utils/Message';
import RequestControl from './utils/RequestControl';
import Auth from './utils/Auth';

Vue.config.productionTip = false;
// // 添加实例方法
Vue.prototype.$Message = Message;
Vue.prototype.$RequestControl = RequestControl;
Vue.prototype.$Auth = Auth;
Vue.prototype.$Router = router;

new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});
