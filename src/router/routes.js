import Login from '@/compose/Login';
import OverView from '@/compose/OverView';
const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/overview',
        name: 'overview',
        component: OverView
    }
];

export default routes;
