import Home from '../pages/Home';
import DeleteAccount from '../pages/DeleteAccount';

const publicRoutes = [
    { path: '/', component: Home },
    { 
        path: '/delete-account', 
        component: DeleteAccount,
        layout: null 
    }
];

export { publicRoutes };