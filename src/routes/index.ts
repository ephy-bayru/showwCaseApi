import { Router } from 'express';
import healthRoutes from '../components/health/v1/health.routes';

interface Route {
  path: string;
  handler: Router;
}

const routes: Route[] = [
  { path: '/v1/health', handler: healthRoutes },
];

const createRouter = (routes: Route[]): Router => {
  const router = Router();
  routes.forEach(({ path, handler }) => router.use(path, handler));
  return router;
}

export default createRouter(routes);
