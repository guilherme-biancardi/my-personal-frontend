import { convertRoutes, createRoute } from '@/ts/route';
import { loginRoutes } from './loginRoutes';

const ROUTER_VIEW = 'root' as const;

const login = createRoute('login', 'login');
login.setRedirect('signIn');
login.setComponent(import('@/views/root/LoginView.vue'), ROUTER_VIEW);
login.setChildren(loginRoutes);

const app = createRoute('app', 'app');
app.setComponent(import('@/views/root/AppView.vue'), ROUTER_VIEW);

export const rootRoutes = convertRoutes([login.route, app.route]);
