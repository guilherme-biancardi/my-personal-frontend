import { convertRoutes, createRoute } from '@/ts/route';
import { rootRoutes } from './modules/rootRoutes';
import { isAuthenticated } from '@/middlewares/isAuthenticated';

const rootRoute = createRoute('/', 'root');
rootRoute.setRedirect('login');
rootRoute.setChildren(rootRoutes);
rootRoute.setBeforeEnter(isAuthenticated)

export const useRoutes = () => convertRoutes([rootRoute.route]);
