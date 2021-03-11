import Vue from 'vue';
import vueParticles from 'vue-particles';

import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true, dynamic: true });

Vue.use(vueParticles);

import {
    Form,
    FormItem,
    Input,
    Loading,
    Table,
    TableColumn
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$loading = Loading.service;

