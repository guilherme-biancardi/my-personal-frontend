import { convertRoutes, createRoute } from '@/ts/route';

const ROUTER_VIEW = 'app' as const;

const clients = createRoute('clientes', 'clients');
clients.setComponent(import('@/views/app/ClientsView.vue'), ROUTER_VIEW);

export const appRoutes = convertRoutes([clients.route]);
