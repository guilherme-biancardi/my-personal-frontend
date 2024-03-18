import { convertRoutes, createRoute } from '@/ts/route';

const ROUTER_VIEW = 'login' as const;

const signIn = createRoute('entrar', 'signIn');
signIn.setComponent(import('@/views/login/SignInView.vue'), ROUTER_VIEW);

const forgotPassword = createRoute('esqueci-a-senha', 'forgotPassword');
forgotPassword.setComponent(import('@/views/login/ForgotPasswordView.vue'), ROUTER_VIEW);

const resendActivationLink = createRoute('reenviar-codigo', 'resendActivationLink');
resendActivationLink.setComponent(
  import('@/views/login/ResendActivationLinkView.vue'),
  ROUTER_VIEW
);

export const loginRoutes = convertRoutes([
  signIn.route,
  forgotPassword.route,
  resendActivationLink.route
]);
