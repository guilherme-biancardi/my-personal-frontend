import { convertRoutes, createRoute } from '@/ts/route';
import { loginRoutes } from './loginRoutes';
import { isAuthenticated } from '@/middlewares/isAuthenticated';
import { isNotAuthenticated } from '@/middlewares/isNotAuthenticated';

const ROUTER_VIEW = 'root' as const;

const login = createRoute('login', 'login');
login.setRedirect('signIn');
login.setComponent(import('@/views/root/LoginView.vue'), ROUTER_VIEW);
login.setChildren(loginRoutes);
login.setBeforeEnter(isAuthenticated);

const app = createRoute('app', 'app');
app.setComponent(import('@/views/root/AppView.vue'), ROUTER_VIEW);
app.setBeforeEnter(isNotAuthenticated);

const resetPassword = createRoute('redefinir-senha/:token', 'resetPassword');
resetPassword.setComponent(import('@/views/root/ResetPasswordView.vue'), ROUTER_VIEW);

const changePassword = createRoute('alterar-senha/', 'changePassword');
changePassword.setComponent(import('@/views/root/ChangePasswordView.vue'), ROUTER_VIEW);
changePassword.setBeforeEnter(isNotAuthenticated);

export const rootRoutes = convertRoutes([
  login.route,
  app.route,
  resetPassword.route,
  changePassword.route
]);
