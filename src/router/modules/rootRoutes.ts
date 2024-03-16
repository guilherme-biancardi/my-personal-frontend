import { convertRoutes, createRoute } from '@/ts/route';
import { loginRoutes } from './loginRoutes';

const ROUTER_VIEW = 'root' as const;

const loginRoute = createRoute('login', 'login');
loginRoute.setRedirect('signIn');
loginRoute.setComponent(import('@/views/root/LoginView.vue'), ROUTER_VIEW);
loginRoute.setChildren(loginRoutes);

export const rootRoutes = convertRoutes([loginRoute.route]);
