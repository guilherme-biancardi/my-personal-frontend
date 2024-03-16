import { convertRoutes, createRoute } from '@/ts/route';

const ROUTER_VIEW = 'login' as const;

const signInRoute = createRoute('entrar', 'signIn');
signInRoute.setComponent(import('@/views/login/SignInView.vue'), ROUTER_VIEW);

export const loginRoutes = convertRoutes([signInRoute.route]);
