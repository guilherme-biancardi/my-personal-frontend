import { convertRoutes, createRoute } from '@/ts/route';
import { rootRoutes } from './modules/rootRoutes';

const rootRoute = createRoute('/', 'root');
rootRoute.setRedirect('login');
rootRoute.setChildren(rootRoutes);

export const useRoutes = () => convertRoutes([rootRoute.route]);
